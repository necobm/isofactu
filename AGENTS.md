# AGENTS.md — Isofactu

Instructions for AI agents (Codex, Claude, etc.) working on this repository.

## Repository Layout

```
isofactu/
├── src/                    # PHP backend (Symfony 7.3)
│   ├── Controller/         # REST API controllers (currently empty)
│   ├── Entity/             # Doctrine ORM entities and enums
│   │   └── ValueObject/    # Embedded value objects
│   └── Repository/         # Doctrine repositories
├── frontend/               # React + Vite SPA
│   └── src/
│       ├── pages/          # Full-page components
│       └── components/     # Shared UI components
├── config/                 # Symfony configuration
├── migrations/             # Doctrine database migrations
├── public/                 # Web root (build output lands here)
└── compose.yaml            # Docker Compose (PostgreSQL 16)
```

## Stack Constraints

| Concern | Required approach |
|---------|------------------|
| Money math | `bcmath` string functions only — never PHP `float` |
| DB schema changes | Doctrine migrations via `make:migration` |
| Route definitions | Symfony `#[Route]` attributes on controller methods |
| Frontend styling | Tailwind CSS (`slate` neutrals, `indigo` accents) |
| Charts | Recharts only |
| Frontend state | React `useState` / `useMemo` — no external state manager |
| DB queries | Doctrine QueryBuilder / DQL — no raw SQL |

## Environment

- PHP 8.2+, Composer, Node.js 18+, Docker required.
- PostgreSQL runs in Docker, exposed on **127.0.0.1:5433**.
- Symfony dev server on port 8000; Vite dev server on port 5173.
- Copy `.env` → `.env.local` for local overrides.

## Key Commands

```bash
# Start database
docker compose up -d

# Apply migrations
php bin/console doctrine:migrations:migrate

# Generate migration after entity changes
php bin/console make:migration

# Validate ORM mappings
php bin/console doctrine:schema:validate

# Run tests
php bin/phpunit

# Frontend dev (hot reload)
cd frontend && npm run dev

# Frontend production build
cd frontend && npm run build
```

## Domain Model Summary

- **Subject** — issuer or recipient on an invoice. Identified by `DocumentType` enum (NIF, CIF, OTHER) + document number. Has embedded `Address`.
- **Invoice** — links two `Subject` records (issuer + recipient), has `issueDate`, embedded `InvoiceNumber`, and `InvoiceLine` collection.
- **InvoiceLine** — concept with `description`, `quantity`, `unitPrice`, `taxRate`. Subtotal/tax/total computed via `bcmath`.
- Value objects: `Address`, `IdentificationDocument`, `InvoiceNumber` — all embedded in their parent entity.

## Work in Progress

The following areas are **not yet implemented** and are the primary focus of ongoing development:

1. **API controllers** — `src/Controller/` is empty. REST endpoints for Invoice, Subject, and InvoiceLine CRUD need to be created.
2. **Database migrations** — entities are defined but no migrations have been generated yet.
3. **Frontend–API integration** — React pages have complete UI but no `fetch`/API calls wired up.

## Testing

- PHPUnit is configured (`phpunit.dist.xml`).
- Tests live in `tests/` (currently minimal).
- Run `php bin/phpunit` before submitting changes that touch PHP code.
- After any entity change, run `php bin/console doctrine:schema:validate` to confirm mapping integrity.

## Code Style

- PHP: PSR-12, strict types (`declare(strict_types=1)`), constructor property promotion.
- JavaScript/JSX: 2-space indent, single quotes, functional components with hooks only.
- Follow `.editorconfig` settings for whitespace/line endings.