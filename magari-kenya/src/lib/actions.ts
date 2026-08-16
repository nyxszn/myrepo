"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createUser, toggleFavorite, verifyCredentials } from "./users";
import { SESSION_COOKIE, createSessionToken, getSession } from "./session";

export type AuthState = { error?: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function safeNext(formData: FormData) {
  const next = String(formData.get("next") ?? "");
  return next.startsWith("/") && !next.startsWith("//") ? next : "/cars";
}

async function startSession(userId: string, email: string, name: string) {
  const token = await createSessionToken({ userId, email, name });
  cookies().set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function signUpAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (name.length < 2) return { error: "Please enter your name." };
  if (!emailPattern.test(email)) return { error: "Please enter a valid email address." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };

  try {
    const user = await createUser(name, email, password);
    await startSession(user.id, user.email, user.name);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Could not create account." };
  }
  redirect(safeNext(formData));
}

export async function signInAction(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Enter your email and password." };

  const user = await verifyCredentials(email, password);
  if (!user) return { error: "Invalid email or password." };

  await startSession(user.id, user.email, user.name);
  redirect(safeNext(formData));
}

export async function signOutAction() {
  cookies().delete(SESSION_COOKIE);
  redirect("/");
}

export async function toggleFavoriteAction(formData: FormData) {
  const session = await getSession();
  const carId = String(formData.get("carId") ?? "");
  if (!session) redirect(`/login?next=${encodeURIComponent(`/cars/${carId}`)}`);
  await toggleFavorite(session.userId, carId);
  revalidatePath("/favorites");
  revalidatePath(`/cars/${carId}`);
}
