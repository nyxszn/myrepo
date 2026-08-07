import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export type User = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  favorites: string[];
  createdAt: string;
};

const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), "data");
const usersFile = path.join(dataDir, "users.json");

async function readUsers(): Promise<User[]> {
  try {
    const raw = await fs.readFile(usersFile, "utf8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

async function writeUsers(users: User[]) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf8");
}

export async function findUserByEmail(email: string) {
  const users = await readUsers();
  return users.find((u) => u.email === email.toLowerCase().trim()) ?? null;
}

export async function findUserById(id: string) {
  const users = await readUsers();
  return users.find((u) => u.id === id) ?? null;
}

export async function createUser(name: string, email: string, password: string) {
  const users = await readUsers();
  const normalized = email.toLowerCase().trim();
  if (users.some((u) => u.email === normalized)) {
    throw new Error("An account with that email already exists");
  }
  const user: User = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalized,
    passwordHash: await bcrypt.hash(password, 10),
    favorites: [],
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await writeUsers(users);
  return user;
}

export async function verifyCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  return ok ? user : null;
}

export async function toggleFavorite(userId: string, carId: string) {
  const users = await readUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) throw new Error("User not found");
  user.favorites = user.favorites.includes(carId)
    ? user.favorites.filter((id) => id !== carId)
    : [...user.favorites, carId];
  await writeUsers(users);
  return user.favorites;
}
