import Link from "next/link";
import { notFound } from "next/navigation";
import { cars, formatKes } from "@/data/cars";
import { garageBySlug, garages } from "@/data/garages";
import { CarCard } from "@/components/CarCard";

export function generateStaticParams() {
  return garages.map((garage) => ({ slug: garage.slug }));
}

export default function GaragePage({ params }: { params: { slug: string } }) {
  const garage = garageBySlug(params.slug);
  if (!garage) notFound();

  const stock = cars
    .filter((car) => car.garageSlug === garage.slug)
    .sort((a, b) => b.priceKes - a.priceKes);

  return (
    <div className="space-y-8">
      <Link href="/garages" className="text-sm text-white/50 hover:text-white">
        ← All garages
      </Link>

      <section className="card p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black">{garage.name}</h1>
            <p className="mt-1 text-white/60">
              {garage.type} &middot; {garage.address}
            </p>
            <p className="text-white/60">{garage.phone}</p>
          </div>
          <a
            href={garage.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Visit website
          </a>
        </div>
        <p className="mt-4 max-w-3xl text-white/70">{garage.blurb}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {garage.brands.map((brand) => (
            <span key={brand} className="chip">
              {brand}
            </span>
          ))}
        </div>
        {stock.length > 0 && (
          <p className="mt-4 text-sm text-white/60">
            {stock.length} listings from {formatKes(Math.min(...stock.map((c) => c.priceKes)))} to{" "}
            {formatKes(Math.max(...stock.map((c) => c.priceKes)))}
          </p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Cars on offer</h2>
        {stock.length === 0 ? (
          <p className="card p-6 text-white/60">
            No listings tracked for this garage right now — check their website for current stock.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stock.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
