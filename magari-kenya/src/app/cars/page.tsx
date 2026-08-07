import Link from "next/link";
import { cars } from "@/data/cars";
import { garages } from "@/data/garages";
import { CarCard } from "@/components/CarCard";

type SearchParams = {
  q?: string;
  make?: string;
  garage?: string;
  body?: string;
  max?: string;
  sort?: string;
};

const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "mileage", label: "Lowest mileage" },
];

export default function CarsPage({ searchParams }: { searchParams: SearchParams }) {
  const q = (searchParams.q ?? "").toLowerCase().trim();
  const make = searchParams.make ?? "";
  const garage = searchParams.garage ?? "";
  const body = searchParams.body ?? "";
  const max = Number(searchParams.max ?? "") || 0;
  const sort = searchParams.sort ?? "newest";

  let results = cars.filter((car) => {
    const haystack = `${car.make} ${car.model} ${car.body} ${car.fuel}`.toLowerCase();
    if (q && !haystack.includes(q)) return false;
    if (make && car.make !== make) return false;
    if (garage && car.garageSlug !== garage) return false;
    if (body && car.body !== body) return false;
    if (max && car.priceKes > max) return false;
    return true;
  });

  results = results.sort((a, b) => {
    if (sort === "price-asc") return a.priceKes - b.priceKes;
    if (sort === "price-desc") return b.priceKes - a.priceKes;
    if (sort === "mileage") return a.mileageKm - b.mileageKm;
    return b.year - a.year;
  });

  const makes = Array.from(new Set(cars.map((c) => c.make))).sort();
  const bodies = Array.from(new Set(cars.map((c) => c.body))).sort();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black">Cars for sale in Kenya</h1>
        <p className="mt-1 text-white/60">
          {results.length} of {cars.length} listings across {garages.length} garages.
        </p>
      </div>

      <form className="card grid gap-3 p-4 md:grid-cols-6">
        <input
          name="q"
          defaultValue={searchParams.q ?? ""}
          placeholder="Search e.g. Prado, hybrid"
          className="field md:col-span-2"
        />
        <select name="make" defaultValue={make} className="field">
          <option value="">All makes</option>
          {makes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select name="garage" defaultValue={garage} className="field">
          <option value="">All garages</option>
          {garages.map((g) => (
            <option key={g.slug} value={g.slug}>
              {g.name}
            </option>
          ))}
        </select>
        <select name="body" defaultValue={body} className="field">
          <option value="">Any body</option>
          {bodies.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select name="max" defaultValue={searchParams.max ?? ""} className="field">
          <option value="">Any price</option>
          <option value="2000000">Under KES 2M</option>
          <option value="5000000">Under KES 5M</option>
          <option value="10000000">Under KES 10M</option>
          <option value="25000000">Under KES 25M</option>
        </select>
        <select name="sort" defaultValue={sort} className="field md:col-span-2">
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary md:col-span-2">
          Apply filters
        </button>
        <Link href="/cars" className="btn-ghost md:col-span-2">
          Reset
        </Link>
      </form>

      {results.length === 0 ? (
        <p className="card p-8 text-center text-white/60">
          No cars match those filters. Try widening your budget or clearing the search.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
