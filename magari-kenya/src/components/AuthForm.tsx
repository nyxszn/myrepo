"use client";

import { useFormState, useFormStatus } from "react-dom";
import type { AuthState } from "@/lib/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn-primary w-full" disabled={pending}>
      {pending ? "Please wait…" : label}
    </button>
  );
}

export function AuthForm({
  mode,
  action,
  next,
}: {
  mode: "login" | "signup";
  action: (prev: AuthState, formData: FormData) => Promise<AuthState>;
  next?: string;
}) {
  const [state, formAction] = useFormState(action, {});

  return (
    <form action={formAction} className="space-y-4">
      {next && <input type="hidden" name="next" value={next} />}
      {mode === "signup" && (
        <label className="block space-y-1.5">
          <span className="text-sm text-white/70">Full name</span>
          <input name="name" className="field" placeholder="Jane Wanjiku" required />
        </label>
      )}
      <label className="block space-y-1.5">
        <span className="text-sm text-white/70">Email</span>
        <input
          name="email"
          type="email"
          className="field"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />
      </label>
      <label className="block space-y-1.5">
        <span className="text-sm text-white/70">Password</span>
        <input
          name="password"
          type="password"
          className="field"
          placeholder={mode === "signup" ? "At least 8 characters" : "Your password"}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          required
        />
      </label>
      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
        >
          {state.error}
        </p>
      )}
      <SubmitButton label={mode === "signup" ? "Create account" : "Log in"} />
    </form>
  );
}
