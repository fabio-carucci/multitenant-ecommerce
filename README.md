<div align="center">
  <img src="public/next.svg" alt="SELLIO Logo" width="120"/>
  <h1>SELLIO</h1>
  <p>Multi-tenant E‑commerce Platform as a Service</p>
</div>

## 📋 Project Description

SELLIO is a multi-tenant e‑commerce platform built with Next.js 15 and Payload CMS. It enables multiple shops to run independently on dedicated subdomains (e.g., `shop.sellio.com`) while sharing a single application infrastructure.

Included in the platform:

- Multi-tenant management with access control and subdomain routing
- Payload Admin CMS to manage users, shops (tenants), products, media, categories, tags, orders, and reviews
- Product catalog with images, hierarchical categories, tags, and protected content
- Stripe payments (account onboarding checks before allowing product creation)
- Post‑purchase library with gated content for customers
- Type‑safe APIs via tRPC + React Query
- Media uploads to Vercel Blob Storage
- MongoDB database via Mongoose adapter
- Modern UI via Tailwind CSS 4 and Radix UI

## 🛠️ Technologies Used

- Frontend: Next.js 15 (App Router) with React 19
- Language: TypeScript
- CMS/Backend: Payload CMS 3.x
  - MongoDB adapter: `@payloadcms/db-mongodb`
  - Multi-tenant plugin: `@payloadcms/plugin-multi-tenant`
  - Admin editor: `@payloadcms/richtext-lexical`
  - Next integration: `@payloadcms/next`
  - Payload Cloud plugin: `@payloadcms/payload-cloud`
- Storage: `@payloadcms/storage-vercel-blob` (Vercel Blob)
- Payments: Stripe SDK
- API: tRPC 11 with `@tanstack/react-query`
- UI/UX:
  - Tailwind CSS 4
  - Radix UI (dialog, select, dropdown, navigation, etc.)
  - Lucide Icons
  - Embla Carousel
  - React Day Picker
  - Sonner (toasts)
- Client state: React Query, Zustand
- Utilities: Zod, clsx, tailwind-merge, superjson
- Tooling: ESLint 9, TypeScript 5, Bun (for seed)

Key code references:

- Payload config: `payload.config.ts`
- Next config: `next.config.ts` (wrapped with `withPayload`)
- Multi-tenant middleware: `middleware.ts`
- Stripe: `lib/stripe.ts`
- Access helpers: `lib/access.ts`
- tRPC setup: `trpc/`

## 🚀 Installation & Setup

### Prerequisites

- Node.js 20+
- Bun 1.0+ (for the seed script)
- MongoDB (Atlas or local)
- Stripe account (test or live)
- Vercel Blob enabled (optional but recommended, already integrated)

### Environment Variables

Create a `.env` file in the project root with at least:

```
# Added by Payload
PAYLOAD_SECRET=
DATABASE_URI=

# Global
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_ROOT_DOMAIN=
NEXT_PUBLIC_ENABLE_SUBDOMAIN_ROUTING=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Vercel Blob
BLOB_READ_WRITE_TOKEN=
```

Notes:

- `NEXT_PUBLIC_ROOT_DOMAIN` is used by `middleware.ts` to rewrite requests based on the tenant subdomain (e.g., `tenant.your-root-domain.com`).
- `STRIPE_SECRET_KEY` is required by `lib/stripe.ts`.
- `BLOB_READ_WRITE_TOKEN` enables Vercel Blob uploads (configured in `payload.config.ts`).
- When deploying on a custom domain and you need cross‑subdomain cookies in production, `collections/Users.ts` sets cookie options aligned with `NEXT_PUBLIC_ROOT_DOMAIN`.

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000.

### Migrations & Seeding

Generate Payload TypeScript types (recommended):

```bash
npm run generate:types
```

Run fresh migrations (if your flow uses them):

```bash
npm run db:fresh
```

Seed base data (admin user + categories):

```bash
npm run db:seed
```

The seed (`seed.ts`) creates:

- Admin user: `admin@admin.com` / `password`
- A set of top‑level categories and subcategories

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
/
├── app/                         # Next.js App Router
│   ├── (app)/                   # Public routes and feature areas
│   ├── (payload)/               # Payload Admin integration
│   └── api/                     # Additional API routes (e.g., Stripe webhook)
├── collections/                 # Payload collections (schema & access)
│   ├── Categories.ts
│   ├── Media.ts
│   ├── Orders.ts
│   ├── Products.ts
│   ├── Reviews.ts
│   ├── Tags.ts
│   ├── Tenants.ts
│   └── Users.ts
├── components/                  # Reusable UI components
├── constants/                   # Project constants
├── hooks/                       # Custom React hooks
├── lib/                         # Server/client utilities
│   ├── access.ts                # Role/permission helpers (e.g., isSuperAdmin)
│   ├── stripe.ts                # Stripe initialization
│   └── search-params/           # URL filters / search params helpers
├── modules/                     # Feature modules (auth, products, checkout, ...)
│   ├── auth/
│   ├── categories/
│   ├── checkout/
│   ├── library/
│   ├── products/
│   ├── reviews/
│   ├── tags/
│   └── tenants/
├── trpc/                        # tRPC server/client setup
│   ├── client.tsx
│   ├── init.ts
│   ├── query-client.ts
│   └── routers/_app.ts          # Root router (aggregates sub-routers)
├── public/                      # Static assets
├── payload.config.ts            # Payload configuration
├── middleware.ts                # Multi-tenant rewrite for subdomains
├── next.config.ts               # Next config wrapped with withPayload
├── seed.ts                      # Initial seeding (admin + categories)
└── package.json
```

## 🔍 Key Features

- Multi‑tenant on subdomains
  - `middleware.ts` rewrites URLs based on `Host` (e.g., `fabio.your-root-domain.com`) to a logical tenant space: `tenants/[slug]`.
  - `NEXT_PUBLIC_ROOT_DOMAIN` controls the root domain used for matching.

- Tenant Management
  - Collection `tenants` (`collections/Tenants.ts`) includes:
    - `name`, `slug` (subdomain), `image`
    - Stripe integration: `stripeAccountId`, `stripeDetailsSubmitted`
  - Permissions: create/delete reserved for super‑admins.

- Users & Roles
  - `users` collection with roles `super-admin` and `user`.
  - Multi‑tenant linkage via `tenantsArrayField` (official plugin), displayed in admin sidebar.
  - Update permission: non‑super‑admin users can only update their own profile.
  - Cookies configured for non‑dev environments to work across subdomains.

- Product Catalog
  - `products` with `name`, `description`, `price`, `category`, `tags`, `image`, `cover`.
  - Refund policy (`refundPolicy`), visibility (`isPrivate`, `isArchived`).
  - Protected content (`content`) visible after purchase.
  - Creation rule: if not super‑admin, tenant must have completed Stripe onboarding (`stripeDetailsSubmitted`).

- Taxonomy
  - `categories` supports hierarchies (parent/subcategories seeded).
  - `tags` to label products.

- Media
  - Uploads to Vercel Blob via `@payloadcms/storage-vercel-blob` on `media` collection.

- Stripe Payments
  - Initialization in `lib/stripe.ts` using `STRIPE_SECRET_KEY`.
  - Checkout flow centralized in `modules/checkout/` (dedicated tRPC router).
  - Per‑tenant onboarding; creation of products is blocked until complete.

- Orders & Library
  - `orders` track purchases/access rights.
  - `library` module offers gated content to authenticated customers post‑purchase.

- Reviews
  - `reviews` for ratings/feedback with dedicated UI components (`components/star-rating/`, `components/star-picker/`).

- Type‑safe API with tRPC
  - Root router: `trpc/routers/_app.ts` aggregates:
    - `auth`, `categories`, `products`, `tags`, `tenants`, `checkout`, `library`, `reviews`
  - Client integrated with React Query; serialization via `superjson`.

- UI/UX
  - Tailwind CSS 4 + Radix UI for accessible components.
  - Lucide icons, Embla carousel, Day Picker, Sonner toasts.

## 🌐 Multi‑tenant Routing (Subdomains)

`middleware.ts` inspects the `Host` header:

- If it matches `*.NEXT_PUBLIC_ROOT_DOMAIN`, it extracts `tenantSlug` and rewrites to `/tenants/${tenantSlug}${pathname}`.
- Otherwise, it proceeds normally.
- Matcher excludes: `api/`, `_next/`, `_static/`, `_vercel`, `media/`, and static assets.

Ensure to:

- Configure DNS/wildcard (e.g., `*.your-root-domain.com`).
- Align `NEXT_PUBLIC_ROOT_DOMAIN` with your production domain.

## 🔑 Access Control & Roles

- Helper `isSuperAdmin` in `lib/access.ts`.
- Granular collection rules:
  - `users`: public read; create/delete for super‑admins; self‑update only for regular users.
  - `tenants`: create/delete for super‑admins.
  - `products`: create allowed for super‑admins; otherwise requires tenant with `stripeDetailsSubmitted`; delete only for super‑admins.

## 🧪 Test Data (Seed)

`seed.ts`:

- Creates the admin user: `admin@admin.com` / `password`
- Populates a set of top‑level categories with subcategories (Business, Software Dev, Design, etc.)
- Run via `npm run db:seed` (uses Bun under the hood)

## 🧩 APIs & Modules

- tRPC Routers (`trpc/routers/_app.ts`):
  - `auth`: authentication/session (backed by Payload)
  - `categories`, `products`, `tags`: catalog and taxonomy
  - `tenants`: shop management
  - `checkout`: Stripe payment orchestration
  - `library`: gated post‑purchase content
  - `reviews`: ratings and feedback

- tRPC Client:
  - `trpc/client.tsx`, `trpc/query-client.ts` integrate React Query.

## 🖼️ Media Storage (Vercel Blob)

- Configured in `payload.config.ts` via `vercelBlobStorage`.
- Enabled for the `media` collection.
- Requires `BLOB_READ_WRITE_TOKEN`.

## ⚙️ NPM Scripts

- `dev`: start Next.js with Turbopack
- `build`: production build
- `start`: start production server
- `lint`: run ESLint
- `generate:types`: generate Payload types
- `db:fresh`: fresh database migrations (when configured)
- `db:seed`: run `seed.ts` with Bun

## 🏗️ Deployment

- Next.js + Payload integrated with `withPayload` (`next.config.ts`).
- Recommendations:
  - Set `NEXT_PUBLIC_ROOT_DOMAIN` in production.
  - Configure wildcard subdomain on your DNS and hosting platform.
  - Provide `DATABASE_URI`, `PAYLOAD_SECRET`, `STRIPE_SECRET_KEY`, `BLOB_READ_WRITE_TOKEN`.
  - Enable HTTPS and secure cookies; `collections/Users.ts` handles `SameSite=None`, `secure=true`, and `domain` for non‑dev environments.

## 🔐 Security

- Do not expose secrets to the client.
- Keep `PAYLOAD_SECRET` and `STRIPE_SECRET_KEY` server‑side only.
- Configure CORS, cookies, and HTTPS correctly in production.

## ✅ Roadmap (Ideas)

- Self‑service panel for tenant Stripe onboarding
- Stripe webhooks to update order states
- Advanced search with server‑side filters and URL state (`lib/search-params`)
- Per‑tenant theming (branding, colors, layout)
- Multi‑tenant sitemaps and SEO optimizations

## 👤 Credits

Project by Fabio Carucci.

## 📄 License

All rights reserved. Internal/demo use unless otherwise specified.
