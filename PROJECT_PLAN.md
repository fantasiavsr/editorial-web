# PROJECT_PLAN.md — Editorial Web + Laravel API

> **This file is the persistent source of truth for the project.**
> Updated at the end of every phase. Read this first in every new session.

---

## Current Authentication Assessment

Authentication architecture has been inspected but is not implemented yet.

### Frontend findings

- `src/pages/auth/Login.jsx` and `Register.jsx` use simulated `setTimeout` handlers.
- `src/pages/auth/ForgotPassword.jsx` is a static confirmation flow with no backend reset endpoint.
- `src/components/ProtectedRoute.jsx` trusts a localStorage boolean and is currently not active in routing.
- Dashboard routes are currently public.
- `DashboardProfilesContent.jsx` uses mock profile data with fields: `fullName`, `email`, `phone`, `address`, `city`, and `country`.
- Profile password changes use a mock password check and must be replaced with an authenticated API request.
- No frontend auth context, auth API client, user data source, or token handling exists.

### Backend findings

- Laravel 12.69.2, PHP `^8.2`.
- Standard `users` table and `User` model exist with `id`, `name`, `email`, `password`, `email_verified_at`, timestamps, and remember token.
- Sanctum, Passport, Fortify, and Breeze are not installed.
- No auth controllers, auth API routes, auth middleware, role field, or admin authorization currently exist.
- Existing product, service, and pricing routes are public and must be protected after auth infrastructure is verified.

### Authentication implementation order

1. **Phase 8 — Inspect Authentication Architecture**
2. **Phase 9 — Update User Database & Model**
3. **Phase 10 — Configure Authentication Infrastructure**
4. **Phase 11 — Implement Registration**
5. **Phase 12 — Implement Login**
6. **Phase 13 — Implement Current User & Logout**
7. **Phase 14 — Integrate Profile Authentication**
8. **Phase 15 — Integrate React Authentication**
9. **Phase 16 — Protect Routes & Authorize Admins**
10. **Phase 17 — Test Authentication**

Authentication will use Laravel Sanctum unless implementation inspection identifies a compatible existing system. Work one authentication phase at a time, verify it, and update this plan before continuing.

---

## Overall Architecture

```
                         editorial-web
                         React + Vite
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
          Vercel Mock                  Real Domain
          (Mode A)                     (Mode B)
                │                           │
                ▼                           ▼
           Mock Data                  Laravel API
           (local JS)                      │
                                           ▼
                                        Eloquent
                                           │
                                           ▼
                                         MySQL
```

### Two Deployment Modes

| Mode               | Env Var                 | Data Source              | Requires Backend? |
| ------------------ | ----------------------- | ------------------------ | ----------------- |
| **A — Mock/Demo**  | `VITE_DATA_SOURCE=mock` | Local JS mock data       | No                |
| **B — Production** | `VITE_DATA_SOURCE=api`  | Laravel REST API + MySQL | Yes               |

### Repositories

| Repository          | Purpose               | Status     |
| ------------------- | --------------------- | ---------- |
| `editorial-web`     | React + Vite frontend | ✅ Exists  |
| `editorial-backend` | Laravel REST API      | ✅ Created |

These are **independent repositories**. Not a monorepo.

---

## Current Phase

```
Phase 11 — Implement Registration
Status: ✅ COMPLETE (Backend + Frontend)
```

## Completed Phases

- [x] **Phase 0** — Inspect & Plan (completed 2026-09-12)
- [x] **Phase 1** — Create Laravel Backend (completed 2026-09-12)
- [x] **Phase 2** — First API (Products) (completed 2026-09-14)
- [x] **Phase 3** — React API Layer (completed 2026-09-14)
- [x] **Phase 4** — Mock/API Switching (completed 2026-09-14)
- [x] **Phase 5** — Connect Pages Gradually (completed 2026-09-14)
- [x] **Phase 6** — CRUD Operations (completed 2026-09-14)
- [x] **Phase 7** — Production Laravel + MySQL preparation (completed 2026-09-14)
- [x] **Phase 8** — Inspect Authentication Architecture (completed 2026-09-14)
- [x] **Phase 9** — Update User Database & Model (completed 2026-09-14)
- [x] **Phase 10** — Configure Authentication Infrastructure (completed 2026-09-14)
- [x] **Phase 11** — Implement Registration (completed 2026-09-14)

## Next Phase

- [ ] **Phase 12 — Implement Login**
- [ ] **Phase 12 — Implement Login**
- [ ] **Phase 13 — Implement Current User & Logout**
- [ ] **Phase 14 — Integrate Profile Authentication**
- [ ] **Phase 15 — Integrate React Authentication**
- [ ] **Phase 16 — Protect Routes & Authorize Admins**
- [ ] **Phase 17 — Test Authentication**
- [ ] **Future Task — Deploy to Real Host**

---

## Frontend Analysis (Phase 0 Findings)

### Project Identity

- **Name**: Atelier — Editorial Design Studio
- **Type**: Design-system showcase / portfolio site with admin dashboard
- **Framework**: React 19 + Vite 8 + Tailwind CSS v4
- **Routing**: react-router-dom v7 (classic `<BrowserRouter>` + `<Routes>`)
- **Theme**: next-themes (light/dark, class-based)
- **Deployment**: Vercel (existing)

### Pages & Routes

| Route                 | Page                | Data Source           | Layout                    |
| --------------------- | ------------------- | --------------------- | ------------------------- |
| `/`                   | LandingPage         | Inline + NavLinks     | Self-contained            |
| `/about`              | About               | Inline + NavLinks     | Self-contained            |
| `/products`           | ProductPage         | Inline + NavLinks     | Self-contained            |
| `/pricing`            | PricingPage         | Inline + NavLinks     | Self-contained            |
| `/services`           | ServicePage         | Inline + NavLinks     | Self-contained            |
| `/dashboard`          | Dashboard           | Inline (stats/charts) | DashboardLayout (top-bar) |
| `/dashboard/profiles` | DashboardProfiles   | Inline mock           | DashboardLayout           |
| `/dashboard/products` | DashboardProducts   | **MockProducts**      | DashboardLayout           |
| `/dashboard/services` | DashboardServices   | **MockServices**      | DashboardLayout           |
| `/dashboard/pricing`  | DashboardPricing    | **MockPricing**       | DashboardLayout           |
| `/dashboard/settings` | DashboardSettings   | Inline                | DashboardLayout           |
| `/dashboard2/*`       | Dashboard2 variants | Same as above         | DashboardSidebarLayout    |
| `/login`              | Login               | Local form state      | Self-contained            |
| `/register`           | Register            | Local form state      | Self-contained            |
| `/forgot-password`    | ForgotPassword      | Local form state      | Self-contained            |
| `/unauthorized`       | Unauthorized        | None                  | Self-contained            |
| `*`                   | NotFound            | None                  | Self-contained            |

### Current Data Architecture

**Two distinct data patterns:**

1. **Public showcase pages** (`/products`, `/pricing`, `/services`, `/about`, `/`)
   - Section components have **inline hardcoded data** (not imported from exampleData.js)
   - Only `NavLinks` is imported from exampleData.js for the Navbar
   - Each section is a self-contained visual showcase

2. **Dashboard CRUD pages** (`/dashboard/products`, `/dashboard/services`, `/dashboard/pricing`)
   - Import `MockProducts`, `MockServices`, `MockPricing` from `src/data/exampleData.js`
   - Use `useState()` initialized with mock data
   - Support client-side filtering, sorting, search
   - Use generic `DashboardProductList` component
   - CRUD via `EntityCard`, `EntityFormModal`, `EntityDeleteDialog` components
   - Entity shapes defined in `src/components/data-management/entitySchemas.js`

3. **Dashboard overview** (`/dashboard`)
   - Stats, charts, and activity feed all use inline data
   - `StatOverview`, `AnalyticsChart`, `PerformanceChart`, `PerformanceTable`, `ActivityPanel`

4. **Auth pages** (`/login`, `/register`, `/forgot-password`)
   - Local form state only, fake `setTimeout` login simulation
   - `ProtectedRoute` checks `localStorage.getItem("isAuthenticated")`

### Mock Data Summary (`src/data/exampleData.js`)

| Export         | Count   | Shape                                                                      | Used By             |
| -------------- | ------- | -------------------------------------------------------------------------- | ------------------- |
| `NavLinks`     | 6 items | `{key, label, path, subLinks?}`                                            | Navbar on all pages |
| `MockProducts` | 6 items | `{name, type, price, available, status, sku, description}`                 | Dashboard Products  |
| `MockServices` | 3 items | `{name, description, included[], price, billingPeriod, duration, members}` | Dashboard Services  |
| `MockPricing`  | 3 items | `{name, description, price, billingPeriod, benefits[], duration}`          | Dashboard Pricing   |

### Entity Schemas (`src/components/data-management/entitySchemas.js`)

Well-defined schemas for `product`, `service`, and `pricing` entities with field types, validation, and display formatting. These schemas will inform the Laravel migrations.

### Key Dependencies

| Package                 | Version | Purpose                      |
| ----------------------- | ------- | ---------------------------- |
| react                   | ^19.2.8 | UI framework                 |
| react-router-dom        | ^7.18.3 | Client-side routing          |
| vite                    | ^8.2.2  | Build tool + dev server      |
| tailwindcss             | ^4.3.3  | CSS framework                |
| next-themes             | ^0.4.6  | Dark/light mode              |
| lucide-react            | ^1.34.0 | Icons                        |
| motion                  | ^13.1.1 | Animations                   |
| gsap                    | ^3.15.0 | Advanced animations          |
| three + @react-three/\* | —       | 3D visualization (dashboard) |

### Existing Project Files (No Services Layer)

```
src/
├── App.jsx              ← Router + ThemeProvider
├── main.jsx             ← Entry point
├── index.css            ← Tailwind v4 + theme colors
├── animations/          ← Empty animations.js
├── assets/              ← hero.png, react.svg, vite.svg
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ThemeToggle.jsx
│   ├── ProtectedRoute.jsx
│   ├── dashboard/       ← StatOverview, Charts, etc.
│   ├── product/         ← DashboardProductList
│   └── data-management/ ← EntityCard, EntityFormModal, entitySchemas
├── data/
│   └── exampleData.js   ← NavLinks, MockProducts, MockServices, MockPricing
├── hooks/
│   └── useScrollAnimation.js
├── layouts/
│   ├── DashboardLayout.jsx
│   ├── DashboardSidebarLayout.jsx
│   ├── MainLayout.jsx          ← Empty placeholder
│   └── AuthLayout.jsx          ← Empty placeholder
├── lib/
│   └── utils.js                ← Empty
├── pages/
│   ├── landing/LandingPage.jsx
│   ├── about/About.jsx
│   ├── auth/ (Login, Register, ForgotPassword)
│   ├── dashboard/ (Dashboard, DashboardProfiles, DashboardProducts, etc.)
│   ├── dashboard2/ (Dashboard2 variants with sidebar layout)
│   ├── error/ (Unauthorized, NotFound)
│   ├── pricing/PricingPage.jsx
│   ├── product/ProductPage.jsx
│   └── service/ServicePage.jsx
├── sections/
│   ├── landing/ (Hero, FeaturedQuote, Chapters, etc.)
│   ├── about/ (AboutHero, AboutStory, etc.)
│   ├── product/ (ProductGrid, ProductList, etc. — 7 variations)
│   ├── pricing/ (PricingCards, ThreeTierPricing, etc. — 7 variations)
│   ├── service/ (ServiceCards, ServiceAccordion, etc. — 7 variations)
│   └── dashboard/ (DashboardOverview, DashboardProductsContent, etc.)
└── styles/
    └── animations.css   ← CSS keyframes & utility classes
```

**No `src/services/` directory exists. No API calls anywhere. No `.env` files.**

---

## Recommended First API Resource

**Products** — recommended for these reasons:

1. `MockProducts` in `exampleData.js` has the clearest, simplest shape (6 flat fields)
2. The dashboard CRUD pages already support create, edit, delete with `EntityFormModal`
3. `entitySchemas.js` already defines the product field schema — this maps directly to a Laravel migration
4. Products is a universally understood CRUD concept
5. Minimal complexity: no nested relations, no authentication required

### Product Data Shape (Mock → API)

```
Mock (exampleData.js)         →    API Response
─────────────────────               ─────────────
name: "Wireless Headphones"         "name": "Wireless Headphones"
type: "Electronics"                 "type": "Electronics"
price: "$349"                       "price": "$349"
available: 24                       "available": 24
status: "active"                    "status": "active"
sku: "WH-001"                       "sku": "WH-001"
description: "Premium..."           "description": "Premium..."
                                    "id": 1          ← added by DB
                                    "created_at": .. ← added by DB
                                    "updated_at": .. ← added by DB
```

---

## Implementation Phases

### Phase 0 — Inspect & Plan ✅

- Inspect editorial-web project
- Understand pages, routes, data, components
- Create PROJECT_PLAN.md
- Identify first API resource (Products)

### Phase 1 — Create Laravel Backend ✅

- Create `editorial-backend` as independent Laravel project
- Git initialization (separate repository)
- `.env` + MySQL connection
- Basic `GET /api/health` route to verify
- Verify Laravel runs on `http://localhost:8000`

### Phase 2 — First API (Products) ✅

- Migration: `products` table
- Model: `Product`
- Controller: `ProductController@index`
- Route: `GET /api/products`
- Seeder with sample data matching MockProducts
- Test endpoint independently (browser/curl/Postman)

### Phase 3 — React API Layer ✅

- Create `src/services/api/` directory
- Create `src/services/api/products.js` (fetch-based)
- Create `src/services/api/config.js` (API URL from env)
- Do NOT connect to pages yet

### Phase 4 — Mock/API Switching ✅

- Add `.env` files with `VITE_DATA_SOURCE` and `VITE_API_URL`
- Create data source abstraction (same interface, mock vs API)
- Connect to dashboard products page
- Verify BOTH modes work
- **Major architectural checkpoint**

### Phase 5 — Connect Pages Gradually ✅

- Added `services` and `pricing_plans` migrations, models, and seeders
- Added `GET /api/services` and `GET /api/pricing` endpoints
- Added `src/services/api/catalog.js`
- Connected dashboard services and pricing pages to the data abstraction layer
- Added loading and error states to both pages
- API requests automatically fall back to mock data when unavailable
- Verified backend endpoints with curl and frontend production build

### Phase 6 — CRUD Operations ✅

- Added service and pricing create/update/delete API clients
- Extended all data sources with CRUD and mock fallback behavior
- Added shared `useEntityCrud` hook for dashboard mutation state
- Connected Products, Services, and Pricing forms to API/mocks
- Added create buttons, edit/delete callbacks, validation feedback, and loading/error states
- Marked product SKU as required to match backend validation
- Verified frontend production build and backend tests

### Phase 7 — Production Laravel + MySQL ✅

- Added Laravel CORS configuration using the exact `FRONTEND_URL` origin
- Registered CORS middleware for API routes
- Updated backend `.env.example` with production-safe MySQL placeholders
- Added backend production deployment and hosting guidance
- Added frontend Phase 7 guide covering Vercel variables, HTTPS, CORS, SPA fallback, and reverse proxy routing
- No production deployment or production database migration performed
- Operator still must provide the real domain, API URL, MySQL credentials, HTTPS, document root, and proxy rules

### Vercel Mock Deployment ✅

Vercel mock deployment is already working as intended:

- Vercel uses the single React repository
- No Laravel backend is required
- No committed `.env` file is required
- Missing `VITE_DATA_SOURCE` defaults to mock mode
- Dashboard data falls back to local mock data when the API is unavailable
- SPA routes are handled by the existing Vercel rewrite configuration

### Phase 8 — Inspect Authentication Architecture ✅

- Inspected existing React auth pages, routing, ProtectedRoute, dashboard profile UI, and API utilities.
- Confirmed Login, Register, and Forgot Password are simulated and do not call an API.
- Confirmed profile fields currently required by the UI: `fullName`, `email`, `phone`, `address`, `city`, and `country`.
- Confirmed password changes are simulated and dashboard routes are not currently protected.
- Inspected Laravel User model, users migration, auth config, routes, middleware, CORS, seeders, and dependencies.
- Confirmed Sanctum, Passport, Fortify, and Breeze are not installed.
- Confirmed Laravel has no auth endpoints, role field, auth middleware, or admin authorization.
- Recommended Laravel Sanctum personal access tokens for the independent React/API architecture.
- Verification: read-only code audit completed; no authentication code changed in this phase.

### Phase 9 — Update User Database & Model ✅

- Added a non-destructive migration for `phone`, `address`, `city`, `country`, and backend-controlled `role` fields.
- Updated `User::$fillable`, hidden attributes, and casts without exposing passwords or remember tokens.
- Updated `UserFactory` with profile fields and a default `user` role.
- Did not add a default admin account or allow role assignment through frontend data; admin provisioning belongs to a later protected-auth phase.
- Verified migration status and ran Laravel tests successfully.

### Phase 10 — Configure Authentication Infrastructure ✅

- Installed Laravel Sanctum `^4.3` for API personal access tokens.
- Ran Laravel API scaffolding and created the `personal_access_tokens` migration.
- Ran the migration successfully against the local XAMPP MySQL database.
- Added `HasApiTokens` to the `User` model.
- Confirmed API route registration remains stable; auth endpoints are intentionally deferred to Phase 11.
- Verified Laravel tests pass.

### Phase 11 — Implement Registration ✅

- Added `AuthController::register` with name, email, password, and confirmation validation.
- Added `POST /api/register`.
- Passwords use the User model's Laravel `hashed` cast and are never returned.
- New users always receive the backend-controlled `user` role.
- Registration issues a Sanctum personal access token in the response for the next auth phase.
- Connected the existing React Register form to `POST /api/register`.
- The frontend maps `fullName` to the backend `name` field and stores the returned token locally for the next auth phase.
- Registration validation errors are displayed in the existing form.
- Verified successful registration and duplicate-email validation with curl.
- Verified frontend production build and Laravel tests pass.

Next: Phase 12 — Implement Login

The existing UI is currently mock-only. Before deployment work continues, authentication is divided into these small phases:

- Inspect existing auth/profile/dashboard requirements
- Add required user model fields and role support
- Add Sanctum authentication infrastructure
- Implement registration
- Implement login
- Implement current-user and logout endpoints
- Connect profile and password changes
- Integrate React auth state and existing forms
- Protect dashboard routes and backend resources
- Test authentication and admin authorization

Current findings:

- Login and registration use simulated timers.
- Profile fields currently used are `fullName`, `email`, `phone`, `address`, `city`, and `country`.
- Password changes are mocked.
- `ProtectedRoute` trusts localStorage and is not currently active.
- Laravel has a standard users table but no Sanctum, auth routes, role field, or auth middleware.

### Future Task — Deploy to Real Host

This is intentionally not an implementation phase yet. Complete the authentication phases first. When a real host is selected, follow the deployment guide in `docs/PHASE7_PRODUCTION_DEPLOYMENT.html` and this sequence:

#### Backend deployment

1. Provision PHP 8.2+, Composer, MySQL, HTTPS, and a web server.
2. Create a production database and a dedicated database user. Do not use MySQL `root`.
3. Clone the `editorial-backend` repository to the server.
4. Point the web-server document root to Laravel's `public/` directory.
5. Create the private backend `.env` from `.env.example`.
6. Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL`, `FRONTEND_URL`, and production MySQL credentials.
7. Generate the application key on the server:

   ```bash
   php artisan key:generate
   ```

8. Install production dependencies and run safe migrations:

   ```bash
   composer install --no-dev --optimize-autoloader
   php artisan migrate --force
   php artisan config:cache
   php artisan route:cache
   php artisan view:cache
   php artisan storage:link
   ```

9. Verify the backend:

   ```bash
   curl https://api.example.com/api/health
   ```

#### Frontend deployment

1. Keep `.env` files out of Git; they are already ignored.
2. In the real host or Vercel project settings, set:

   ```env
   VITE_DATA_SOURCE=api
   VITE_API_URL=https://api.example.com/api
   VITE_API_TIMEOUT=5000
   ```

3. Build the existing `editorial-web` repository:

   ```bash
   npm ci
   npm run build
   ```

4. Configure SPA fallback so `/dashboard`, `/products`, and other React routes load `index.html`.
5. If using same-domain routing, configure the reverse proxy so `/api/*` reaches Laravel and all other frontend routes reach React.
6. Confirm CORS allows the exact frontend origin through Laravel's `FRONTEND_URL` value.
7. Test health, GET, POST, PUT, and DELETE requests from the deployed frontend.

#### Required production decisions

Before starting this separate task, provide or decide:

- Real frontend domain
- Real API domain or same-domain proxy arrangement
- Hosting provider and web-server type
- PHP version and document root
- MySQL host, database, username, and password
- HTTPS certificate setup
- Backup and rollback procedure

Never run `migrate:fresh`, destructive seeders, or force pushes against a production system.

---

## Data Source Abstraction (Planned Architecture)

```
Page Component
     ↓
Data Service (src/services/)
     ↓
┌──────────────────┐
│  VITE_DATA_SOURCE │
├──────────────────┤
│  "mock"  │ "api" │
│    ↓     │   ↓   │
│ mockData │ fetch()│
│          │   ↓   │
│          │Laravel │
│          │   ↓   │
│          │ MySQL  │
└──────────────────┘
```

---

## Environment Variables (Planned)

### Local `.env` (gitignored, API-first development)

```env
VITE_DATA_SOURCE=api
VITE_API_URL=/api
VITE_API_TIMEOUT=3000
```

Local Vite proxies `/api` to `http://localhost:8000`, so local development does not require CORS.

### Vercel environment

Leave `VITE_DATA_SOURCE` unset for the public mock/demo deployment. The application defaults to mock data and does not require Laravel.

### Real host or production API environment

Configure these in the host's environment settings, never in Git:

```env
VITE_DATA_SOURCE=api
VITE_API_URL=https://api.example.com/api
VITE_API_TIMEOUT=5000
```

**Remember:** `VITE_` prefix = public. Never put secrets here.

---

## Important Architectural Decisions

1. **Two independent repos** — `editorial-web` (React) and `editorial-backend` (Laravel)
2. **Mock data is NEVER deleted** — always available as fallback
3. **Data source switching via env var** — `VITE_DATA_SOURCE=mock|api`
4. **Native fetch()** — no Axios, no React Query initially
5. **Dashboard CRUD pages first** — these already consume mock data from exampleData.js
6. **Public showcase pages later** — their inline data is harder to extract (low priority)
7. **No auth initially** — add authentication in a later phase
8. **Products first** — simplest entity, clearest schema

---

## Known Issues

- None currently. Clean codebase, clean Git state.

## Last Known-Good State

- **Frontend Git**: branch `main`; Vercel mock workflow remains supported
- **Backend Git**: branch `master`; Laravel API and production preparation are committed separately
- **Build**: frontend production build passes
- **Tests**: backend Laravel tests pass
- **All mock data intact**: `src/data/exampleData.js` remains available
- **Local API development**: Vite `/api` proxy routes to Laravel on port 8000
- **Production deployment**: intentionally not performed; follow the future real-host guide above

## Testing Instructions

### Verify current state

```bash
cd editorial-web
npm run dev
# Visit http://localhost:5173
# Check: Landing page loads, products/pricing/services pages work
# Check: Dashboard pages show mock data
# Check: Dark mode toggle works
```

## Rollback / Checkpoint Information

| Phase       | Commit                                    | Description                                            |
| ----------- | ----------------------------------------- | ------------------------------------------------------ |
| Pre-Phase 0 | `7cc7ab3`                                 | Original state before any API work                     |
| Phase 1     | `262ef25` (backend)                       | Initial Laravel installation                           |
| Phase 2     | `ce2b095` (backend)                       | Products API with full CRUD endpoints                  |
| Phase 5     | `b1ebb1e` (backend), `5dafbf8` (frontend) | Services and pricing APIs connected to dashboard pages |
