# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Next.js 16 App Router project bootstrapped with `create-next-app`, using React 19, Tailwind CSS v4, and TypeScript. Persistence is **PostgreSQL** accessed through **Drizzle ORM**. Currently at the starter stage — only the default `app/` scaffold exists.

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml` / `pnpm-lock.yaml`) — use `pnpm`, not npm/yarn.

- `pnpm dev` — start the dev server at http://localhost:3000
- `pnpm build` — production build
- `pnpm start` — serve the production build
- `pnpm lint` — run ESLint

No test framework is configured yet.

## Architecture

- **App Router** under `app/` — `layout.tsx` is the root layout (loads Geist / Geist Mono fonts via `next/font/google` and sets html/body classes); `page.tsx` is the home route.
- **Styling** is Tailwind CSS v4, configured entirely in CSS via `app/globals.css` (`@import "tailwindcss"` + `@theme inline`) rather than a `tailwind.config` file. PostCSS uses `@tailwindcss/postcss` (`postcss.config.mjs`). Theme tokens (`--background`, `--foreground`, font vars) are defined in `globals.css` with dark mode via `prefers-color-scheme`.
- **Path alias**: `@/*` maps to the project root (`tsconfig.json`).
- **ESLint** is flat-config (`eslint.config.mjs`) extending `eslint-config-next` core-web-vitals + typescript presets.

## Database

- **PostgreSQL** is the database; **Drizzle ORM** is the only data-access layer — do not add another ORM or write raw SQL clients alongside it.
- Schema lives in TypeScript (Drizzle schema files) and is the source of truth; migrations are generated from it with `drizzle-kit`, never written by hand against the DB.
- Connection string comes from the environment (`DATABASE_URL`) — never hardcode credentials.
- Not installed/configured yet: no `drizzle-orm`/`drizzle-kit` dependencies, `drizzle.config.ts`, schema files, or migrations exist in the repo so far.

## Notes

- `sharp` and `unrs-resolver` builds are disabled in `pnpm-workspace.yaml` (`allowBuilds` / `ignoredBuiltDependencies`).
