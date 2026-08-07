import Link from "next/link";
import { redirect } from "next/navigation";
import { carById, formatKes } from "@/data/cars";
import { CarCard } from "@/components/CarCard";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/users";

export const metadata = { title: "Saved cars | Magari Kenya" };

export default async function FavoritesPage() {
  const session = await getSession();
  if (!session) redirect("/login?next=%2Ffavorites");

  const user = await findUserById(session.userId);
  const saved = (user?.favorites ?? [])
    .map((id) => carById(id))
    .filter((car): car is NonNullable<ReturnType<typeof carById>> => Boolean(car));
  const total = saved.reduce((sum, car) => sum + car.priceKes, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Your shortlist</h1>
        <p className="mt-1 text-white/60">
          {saved.length} saved {saved.length === 1 ? "car" : "cars"}
          {saved.length > 0 && ` · ${formatKes(total)} combined`}
        </p>
      </div>

      {saved.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-white/60">You haven&apos;t saved any cars yet.</p>
          <Link href="/cars" className="btn-primary mt-4">
            Browse cars
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
