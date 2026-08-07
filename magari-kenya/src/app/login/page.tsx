import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { signInAction } from "@/lib/actions";
import { getSession } from "@/lib/session";

export const metadata = { title: "Log in | Magari Kenya" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  if (await getSession()) redirect("/cars");

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-7">
        <h1 className="text-2xl font-black">Welcome back</h1>
        <p className="mt-1 text-sm text-white/60">
          Log in to save cars and keep a shortlist across garages.
        </p>
        <div className="mt-6">
          <AuthForm mode="login" action={signInAction} next={searchParams.next} />
        </div>
        <p className="mt-5 text-sm text-white/60">
          No account?{" "}
          <Link href="/signup" className="text-emerald-400 hover:underline">
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
