import Link from "next/link";
import { cars, formatKes } from "@/data/cars";
import { garages } from "@/data/garages";
import { CarCard } from "@/components/CarCard";

export const metadata = {
  title: "Luxury & exotic cars in Kenya | Magari Kenya",
};

export default function LuxuryPage() {
  const luxuryCars = cars.filter((c) => c.luxury).sort((a, b) => b.priceKes - a.priceKes);
  const luxuryGarages = garages.filter((g) => g.luxury);
  const total = luxuryCars.reduce((sum, c) => sum + c.priceKes, 0);

  return (
    <div className="space-y-10">
      <section className="card p-8">
        <p className="chip">Special garages</p>
        <h1 className="mt-4 text-4xl font-black">Luxury &amp; exotic cars in Kenya</h1>
        <p className="mt-3 max-w-2xl text-white/60">
          The Nairobi showrooms that hold the expensive metal — Porsche, Range Rover, AMG, BMW M
          and Lexus — with indicative KES prices and links straight to each garage.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <span className="chip">{luxuryCars.length} luxury listings</span>
          <span className="chip">{luxuryGarages.length} specialist garages</span>
          <span className="chip">Combined floor value {formatKes(total)}</span>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Specialist garages</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {luxuryGarages.map((garage) => (
            <div key={garage.slug} className="card p-4">
              <h3 className="font-semibold">{garage.name}</h3>
              <p className="mt-1 text-sm text-white/50">{garage.brands.join(" • ")}</p>
              <div className="mt-3 flex gap-3 text-sm">
                <Link href={`/garages/${garage.slug}`} className="text-emerald-400 hover:underline">
                  Stock
                </Link>
                <a
                  href={garage.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:underline"
                >
                  Website
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Most expensive first</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {luxuryCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>
    </div>
  );
}
