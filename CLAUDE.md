# CLAUDE.md — Isofactu

Guidelines for working on this codebase with Claude Code.

## Architecture Overview

Isofactu is a hybrid app: a **Symfony 7.3 backend** serving REST API endpoints, and a **React SPA** served from `public/build/` (compiled by Vite).

```
Browser → Symfony (public/index.php)
             ├── /api/* → Controllers → Doctrine → PostgreSQL
             └── /* → serves public/build/index.html (React SPA)
```

Frontend routes are client-side only (React). Symfony only handles API routes and the catch-all that returns the SPA shell.

## Domain Model

Located in `src/Entity/`. All mapped with Doctrine attributes.

- **Subject** — represents any party (issuer or recipient). Has an embedded `IdentificationDocument` (type: `DocumentType` enum, number string) and an embedded `Address`.
- **Invoice** — has a `issuer` and `recipient` (both `Subject`), an `issueDate`, an embedded `InvoiceNumber`, and a collection of `InvoiceLine`s (cascade persist/remove).
- **InvoiceLine** — belongs to one Invoice. Stores `description`, `quantity`, `unitPrice`, `taxRate` as decimals. Use `bcmath` functions for all arithmetic (already in use — do not switch to float math).
- **InvoiceNumber** — embedded value object with optional `serial` and required `number`.
- **DocumentType** — PHP enum with cases `NIF`, `CIF`, `OTHER`.

Value objects live in `src/Entity/ValueObject/`.

## Development Rules

### Backend

- Use **Symfony attribute routing** (`#[Route(...)]`) — no YAML routes for controllers.
- Repositories extend `ServiceEntityRepository`. Add query methods there, not in controllers.
- Money/tax calculations must use **bcmath** (`bcadd`, `bcmul`, `bcdiv`, etc.) with string operands. Never use native float arithmetic for financial values.
- Validate input via Symfony Validator constraints on entities or DTOs.
- Keep controllers thin: validate → call repository/service → return JsonResponse.

### Frontend

- Lives in `frontend/`. Build output goes to `public/build/`.
- `npm run dev` starts Vite on port 5173 with hot reload.
- `npm run build` produces the production bundle for Symfony to serve.
- Styling uses **Tailwind CSS** utility classes. Use the `slate` palette for neutrals and `indigo` for primary accents (matching existing components).
- Charts use **Recharts** — don't introduce another charting library.
- No external state management library — use React `useState`/`useMemo`.

### Database

- PostgreSQL 16 via Docker (`docker compose up -d`).
- Exposed on **port 5433** (not default 5432).
- Always create Doctrine migrations for schema changes: `php bin/console make:migration`.
- Never modify the database schema directly; use migrations.

## Common Commands

```bash
# Backend
php bin/console doctrine:migrations:migrate
php bin/console doctrine:schema:validate
php bin/console debug:router
php bin/phpunit

# Frontend
cd frontend
npm run dev     # dev server with HMR
npm run build   # production build → public/build/

# Docker
docker compose up -d
docker compose down
```

## Current Status (as of last commit)

- Entities fully defined with Doctrine mappings.
- No controllers implemented yet — `src/Controller/` is empty.
- No migrations written yet — only entity definitions exist.
- Frontend pages (Dashboard, CreateInvoice) are UI-only with no API calls wired up.
- Next steps: implement API endpoints, write migrations, integrate frontend with API.

## What to Avoid

- Do not use `float` for monetary values — use `bcmath` with string types.
- Do not add EasyAdmin (it was removed from the project).
- Do not introduce new frontend libraries without discussion (especially state managers or form libraries).
- Do not write SQL directly — use Doctrine QueryBuilder or DQL.