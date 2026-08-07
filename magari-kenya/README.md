# Magari Kenya

A website for browsing cars for sale from car garages and dealerships in Kenya — franchise
showrooms, independent importers, online marketplaces and the luxury/exotic specialists — with
prices in Kenya Shillings, links to each garage's own website, and user accounts for shortlisting
cars.

## Features

- **Car listings** (`/cars`) with search plus make, garage, body-type, max-price filters and sorting.
- **Car detail pages** (`/cars/[id]`) with full specs, highlights, the selling garage's contacts and a link to their website.
- **Garage directory** (`/garages`, `/garages/[slug]`) covering Kenyan garages with brands, price range and stock.
- **Luxury & exotic section** (`/luxury`) for the showrooms that hold the expensive cars — Porsche, Range Rover, AMG, BMW M, Lexus.
- **Accounts**: email/password signup and login (bcrypt hashes + signed JWT in an httpOnly cookie) and a per-user saved-cars shortlist at `/favorites`.

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`, `npm run lint`.

## Configuration

| Variable | Purpose | Default |
| --- | --- | --- |
| `AUTH_SECRET` | HMAC secret for session JWTs. Set this in production. | insecure dev value |
| `DATA_DIR` | Directory for the `users.json` account store. | `./data` |

## Data

Garage and car data lives in `src/data/garages.ts` and `src/data/cars.ts`. The garages are real
businesses operating in Kenya and link to their own websites; the listings and prices are curated,
indicative examples of the stock those garages typically carry rather than a live feed of their
inventory. Swap those modules for an API or database to go live.

Accounts are stored in `data/users.json` (git-ignored), which is fine for a demo — move to a real
database before deploying.
