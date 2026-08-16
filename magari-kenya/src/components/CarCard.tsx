import Link from "next/link";
import { Car, formatKes } from "@/data/cars";
import { garageBySlug } from "@/data/garages";
import { CarArt } from "./CarArt";

export function CarCard({ car }: { car: Car }) {
  const garage = garageBySlug(car.garageSlug);
  return (
    <Link
      href={`/cars/${car.id}`}
      className="card group overflow-hidden transition hover:border-emerald-400/40 hover:bg-white/[0.06]"
    >
      <CarArt accent={car.accent} label={car.body} luxury={car.luxury} />
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-base font-semibold leading-tight">
            {car.make} {car.model}
          </h3>
          <p className="text-sm text-white/50">
            {car.year} &middot; {car.condition} &middot; {car.mileageKm.toLocaleString()} km
          </p>
        </div>
        <p className="text-lg font-bold text-emerald-400">{formatKes(car.priceKes)}</p>
        <div className="flex flex-wrap gap-1.5">
          <span className="chip">{car.fuel}</span>
          <span className="chip">{car.transmission}</span>
          <span className="chip">{car.drive}</span>
        </div>
        <p className="text-xs text-white/50">at {garage?.name}</p>
      </div>
    </Link>
  );
}
