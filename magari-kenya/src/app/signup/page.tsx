import Link from "next/link";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { signUpAction } from "@/lib/actions";
import { getSession } from "@/lib/session";

export const metadata = { title: "Sign up | Magari Kenya" };

export default async function SignupPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  if (await getSession()) redirect("/cars");

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-7">
        <h1 className="text-2xl font-black">Create your account</h1>
        <p className="mt-1 text-sm text-white/60">
          Free, takes a minute, and lets you shortlist cars from any garage on the site.
        </p>
        <div className="mt-6">
          <AuthForm mode="signup" action={signUpAction} next={searchParams.next} />
        </div>
        <p className="mt-5 text-sm text-white/60">
          Already registered?{" "}
          <Link href="/login" className="text-emerald-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
