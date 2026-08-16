import type { Metadata } from "next";
import Link from "next/link";
import localFont from "next/font/local";
import "./globals.css";
import { getSession } from "@/lib/session";
import { signOutAction } from "@/lib/actions";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Magari Kenya — cars from Kenya's top garages",
  description:
    "Browse cars for sale from Kenyan car garages and dealerships, from budget hatchbacks to luxury and exotic SUVs, with prices in KES and links to each garage.",
};

const navLinks = [
  { href: "/cars", label: "Cars" },
  { href: "/garages", label: "Garages" },
  { href: "/luxury", label: "Luxury" },
];

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/60 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
            <Link href="/" className="text-lg font-black tracking-tight">
              Magari<span className="text-emerald-400">Kenya</span>
            </Link>
            <nav className="ml-2 hidden gap-1 sm:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              {session ? (
                <>
                  <Link href="/favorites" className="btn-ghost">
                    Saved
                  </Link>
                  <span className="hidden text-sm text-white/60 md:inline">{session.name}</span>
                  <form action={signOutAction}>
                    <button type="submit" className="btn-ghost">
                      Log out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link href="/login" className="btn-ghost">
                    Log in
                  </Link>
                  <Link href="/signup" className="btn-primary">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
          <nav className="flex gap-1 border-t border-white/10 px-4 py-2 sm:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-white/70 hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

        <footer className="mt-16 border-t border-white/10 px-4 py-8 text-center text-xs text-white/40">
          <p>
            Magari Kenya lists garages and dealerships operating in Kenya. Prices are indicative
            and in Kenya Shillings — always confirm availability and final price with the garage.
          </p>
        </footer>
      </body>
    </html>
  );
}
