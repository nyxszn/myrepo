import Link from "next/link";
import { notFound } from "next/navigation";
import { carById, cars, formatKes } from "@/data/cars";
import { garageBySlug } from "@/data/garages";
import { CarArt } from "@/components/CarArt";
import { CarCard } from "@/components/CarCard";
import { getSession } from "@/lib/session";
import { findUserById } from "@/lib/users";
import { toggleFavoriteAction } from "@/lib/actions";

export function generateStaticParams() {
  return cars.map((car) => ({ id: car.id }));
}

export default async function CarPage({ params }: { params: { id: string } }) {
  const car = carById(params.id);
  if (!car) notFound();
  const garage = garageBySlug(car.garageSlug);

  const session = await getSession();
  const user = session ? await findUserById(session.userId) : null;
  const saved = user?.favorites.includes(car.id) ?? false;

  const similar = cars
    .filter((c) => c.id !== car.id && (c.make === car.make || c.body === car.body))
    .slice(0, 3);

  const specs: [string, string][] = [
    ["Year", String(car.year)],
    ["Condition", car.condition],
    ["Mileage", `${car.mileageKm.toLocaleString()} km`],
    ["Engine", car.engineCc ? `${car.engineCc.toLocaleString()} cc` : "Electric"],
    ["Fuel", car.fuel],
    ["Transmission", car.transmission],
    ["Drive", car.drive],
    ["Body", car.body],
  ];

  return (
    <div className="space-y-10">
      <Link href="/cars" className="text-sm text-white/50 hover:text-white">
        ← Back to all cars
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="card overflow-hidden lg:col-span-2">
          <CarArt accent={car.accent} label={car.body} luxury={car.luxury} tall />
          <div className="space-y-6 p-6">
            <div>
              <h1 className="text-3xl font-black">
                {car.make} {car.model}
              </h1>
              <p className="mt-1 text-white/60">
                {car.year} &middot; {car.condition} &middot; {car.mileageKm.toLocaleString()} km
              </p>
              <p className="mt-4 text-3xl font-black text-emerald-400">
                {formatKes(car.priceKes)}
              </p>
            </div>

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {specs.map(([label, value]) => (
                <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <dt className="text-xs uppercase tracking-wide text-white/40">{label}</dt>
                  <dd className="mt-1 text-sm font-semibold">{value}</dd>
                </div>
              ))}
            </dl>

            <div>
              <h2 className="mb-2 text-lg font-bold">Highlights</h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-white/70">
                {car.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          {garage && (
            <div className="card p-5">
              <p className="text-xs uppercase tracking-wide text-white/40">Sold by</p>
              <h2 className="mt-1 text-lg font-bold">{garage.name}</h2>
              <p className="mt-1 text-sm text-white/60">{garage.address}</p>
              <p className="mt-1 text-sm text-white/60">{garage.phone}</p>
              <div className="mt-4 flex flex-col gap-2">
                <a
                  href={garage.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Visit garage website
                </a>
                <Link href={`/garages/${garage.slug}`} className="btn-ghost">
                  See their other cars
                </Link>
              </div>
            </div>
          )}

          <div className="card p-5">
            <h2 className="text-lg font-bold">Save this car</h2>
            <p className="mt-1 text-sm text-white/60">
              {session
                ? "Keep it in your shortlist and compare later."
                : "Log in to add this car to your shortlist."}
            </p>
            {session ? (
              <form action={toggleFavoriteAction} className="mt-4">
                <input type="hidden" name="carId" value={car.id} />
                <button type="submit" className={saved ? "btn-ghost w-full" : "btn-primary w-full"}>
                  {saved ? "Remove from saved" : "Save to shortlist"}
                </button>
              </form>
            ) : (
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/login?next=${encodeURIComponent(`/cars/${car.id}`)}`}
                  className="btn-primary flex-1"
                >
                  Log in
                </Link>
                <Link href="/signup" className="btn-ghost flex-1">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-bold">Similar cars</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((item) => (
              <CarCard key={item.id} car={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
