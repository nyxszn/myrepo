import Link from "next/link";
import { cars, formatKes } from "@/data/cars";
import { garages } from "@/data/garages";

export const metadata = {
  title: "Kenyan car garages & dealerships | Magari Kenya",
};

export default function GaragesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Car garages in Kenya</h1>
        <p className="mt-1 text-white/60">
          Franchise dealers, independent importers, marketplaces and the luxury specialists — each
          with a link to their own website.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {garages.map((garage) => {
          const stock = cars.filter((c) => c.garageSlug === garage.slug);
          const cheapest = stock.length ? Math.min(...stock.map((c) => c.priceKes)) : 0;
          const dearest = stock.length ? Math.max(...stock.map((c) => c.priceKes)) : 0;
          return (
            <div key={garage.slug} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-bold">{garage.name}</h2>
                  <p className="text-sm text-white/50">
                    {garage.type} &middot; {garage.city}
                  </p>
                </div>
                {garage.luxury && (
                  <span className="chip border-amber-400/30 text-amber-300">Luxury</span>
                )}
              </div>
              <p className="mt-3 text-sm text-white/70">{garage.blurb}</p>
              <p className="mt-3 text-xs text-emerald-400">{garage.brands.join(" • ")}</p>
              {stock.length > 0 && (
                <p className="mt-3 text-sm text-white/60">
                  {stock.length} listings · {formatKes(cheapest)} – {formatKes(dearest)}
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href={`/garages/${garage.slug}`} className="btn-primary">
                  View stock
                </Link>
                <a
                  href={garage.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  {garage.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
