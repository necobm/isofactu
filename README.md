# Isofactu

Invoice management application for freelancers and SMEs, with a Spanish tax context (VAT, retention, NIF/CIF identification).

## Stack

| Layer | Technology |
|-------|-----------|
| Backend | Symfony 7.3, PHP 8.2+ |
| ORM | Doctrine ORM 3 + PostgreSQL 16 |
| Frontend | React 18, Vite 5, Tailwind CSS 3 |
| Charts | Recharts |
| Database | PostgreSQL 16 (Docker) |

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- Docker (for the database)

## Setup

```bash
# 1. Clone and install backend dependencies
composer install

# 2. Start the database
docker compose up -d

# 3. Run migrations
php bin/console doctrine:migrations:migrate

# 4. Install and build frontend
cd frontend
npm install
npm run build   # or: npm run dev for watch mode
cd ..

# 5. Start the Symfony dev server
symfony server:start
```

The app will be available at `https://localhost:8000`.

For frontend hot-reload during development:

```bash
# In a second terminal
cd frontend && npm run dev
```

Vite dev server runs on `http://localhost:5173`.

## Environment

Copy `.env` to `.env.local` and adjust if needed. The default dev configuration uses:

- Database: `postgresql://app:…@127.0.0.1:5433/isofactu`
- Docker exposes PostgreSQL on port **5433** (not 5432, to avoid conflicts)

## Project Structure

```
isofactu/
├── src/
│   ├── Controller/          # Symfony controllers (API endpoints)
│   ├── Entity/              # Doctrine entities + value objects
│   └── Repository/          # Doctrine repositories
├── frontend/
│   ├── src/
│   │   ├── pages/           # Dashboard, CreateInvoice, …
│   │   └── components/      # TopNav, Sidebar, widgets
│   └── vite.config.js       # Builds to ../public/build/
├── config/                  # Symfony configuration
├── migrations/              # Doctrine migrations
└── compose.yaml             # Docker Compose (PostgreSQL)
```

## Key Concepts

- **Subject** — a company or person identified by NIF/CIF that acts as issuer or recipient on an invoice.
- **Invoice** — links an issuer and a recipient, has a date and invoice number, and contains one or more lines.
- **InvoiceLine** — a concept with description, quantity, unit price, and tax rate. Totals are computed with `bcmath`.
- **InvoiceNumber** — embedded value object with an optional serial and a sequential number.

## Running Tests

```bash
php bin/phpunit
```