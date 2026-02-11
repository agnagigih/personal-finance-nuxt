# Personal Finance Web

Frontend for a Personal Finance app built with **Nuxt 4**, **Vue 3**, **Pinia**, and **Tailwind CSS**. It connects to a backend API for authentication and transaction data.

## Features

- **Authentication** — Sign in with email/password; JWT access + refresh tokens stored in `localStorage`
- **Token refresh** — Automatic refresh on 401; redirect to login on failure
- **Transactions** — Paginated list of income/expense items (note, account, category, amount, date)
- **Route guards** — `auth` middleware protects `/transactions`; `guest` middleware redirects logged-in users from `/login`
- **Layout** — Default layout with header (app title, Transactions link, Sign out)

## Tech Stack

| Layer        | Tech                |
| ------------ | ------------------- |
| Framework    | Nuxt 4              |
| UI           | Vue 3, Tailwind CSS 4 |
| State        | Pinia               |
| Styling      | Tailwind CSS (Vite plugin) |

## Project Structure

```
app/
├── app.vue              # Root; initializes auth store
├── assets/css/          # Global styles (main.css)
├── components/          # Reusable UI (e.g. Pagination.vue)
├── composables/         # useApi, useTransactionApi, useTransactions
├── layouts/             # default.vue (header + main content)
├── middleware/          # auth.ts, guest.ts
├── mappers/             # API → view (e.g. transaction.mapper)
├── pages/               # login.vue, transactions.vue
├── stores/              # auth (Pinia)
└── types/               # api/*, view/* (TypeScript)
```

## Prerequisites

- **Node.js** (LTS recommended)
- A running **backend API** that provides

## Setup

1. **Clone and install**

   ```bash
   npm install
   ```

2. **Configure API base URL** (optional)

   Default is `https://localhost:7254/api`. Override via Nuxt runtime config, e.g. in `nuxt.config.ts`:

   ```ts
   runtimeConfig: {
     public: {
       apiBase: 'https://your-api.example.com/api',
     },
   },
   ```

   Or at build/runtime with `NUXT_PUBLIC_API_BASE`.

3. **Run**

   ```bash
   npm run dev
   ```

   Open the URL shown in the terminal (e.g. `http://localhost:3000`).

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start dev server           |
| `npm run build`   | Production build            |
| `npm run preview` | Preview production build   |
| `npm run generate`| Static site generation     |

## Notes

- Auth state is restored from `localStorage` on the client; protected routes only enforce auth after hydration.
- API client (`useApi`) attaches `Authorization: Bearer <accessToken>` and handles 401 with a single refresh retry before logging out and redirecting to `/login`.
