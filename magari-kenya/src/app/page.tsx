import Link from "next/link";
import { cars, formatKes } from "@/data/cars";
import { garages } from "@/data/garages";
import { CarCard } from "@/components/CarCard";

export default function HomePage() {
  const featured = [...cars].sort((a, b) => b.year - a.year).slice(0, 6);
  const exotic = [...cars].sort((a, b) => b.priceKes - a.priceKes).slice(0, 3);
  const cheapest = Math.min(...cars.map((c) => c.priceKes));

  return (
    <div className="space-y-14">
      <section className="card overflow-hidden p-8 md:p-12">
        <p className="chip">Nairobi &middot; Mombasa &middot; Kisumu</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight md:text-5xl">
          Every car worth buying in Kenya, from the garages that actually stock them.
        </h1>
        <p className="mt-4 max-w-2xl text-white/60">
          {cars.length} listings from {garages.length} Kenyan garages and dealerships — franchise
          showrooms, independent importers and the exotic specialists — with KES prices and a
          direct link to each garage&apos;s own website.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/cars" className="btn-primary">
            Browse all cars
          </Link>
          <Link href="/luxury" className="btn-ghost">
            Luxury &amp; exotic
          </Link>
          <Link href="/garages" className="btn-ghost">
            See the garages
          </Link>
        </div>
        <dl className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            ["Listings", String(cars.length)],
            ["Garages", String(garages.length)],
            ["From", formatKes(cheapest)],
            ["Makes", String(new Set(cars.map((c) => c.make)).size)],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-white/10 bg-black/30 p-4">
              <dt className="text-xs uppercase tracking-wide text-white/40">{label}</dt>
              <dd className="mt-1 text-lg font-bold text-emerald-400">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Fresh on the floor</h2>
          <Link href="/cars" className="text-sm text-emerald-400 hover:underline">
            View all {cars.length} cars
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">The expensive stuff</h2>
          <Link href="/luxury" className="text-sm text-emerald-400 hover:underline">
            All luxury listings
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {exotic.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Garages we track</h2>
          <Link href="/garages" className="text-sm text-emerald-400 hover:underline">
            All garages
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {garages.slice(0, 6).map((garage) => (
            <Link
              key={garage.slug}
              href={`/garages/${garage.slug}`}
              className="card p-4 transition hover:border-emerald-400/40"
            >
              <h3 className="font-semibold">{garage.name}</h3>
              <p className="mt-1 text-sm text-white/50">
                {garage.type} &middot; {garage.city}
              </p>
              <p className="mt-2 text-xs text-emerald-400">{garage.brands.join(" • ")}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
