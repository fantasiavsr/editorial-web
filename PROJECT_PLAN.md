# PROJECT_PLAN.md — Editorial Web + Laravel API

> **This file is the persistent source of truth for the project.**
> Updated at the end of every phase. Read this first in every new session.

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

| Mode | Env Var | Data Source | Requires Backend? |
|------|---------|-------------|-------------------|
| **A — Mock/Demo** | `VITE_DATA_SOURCE=mock` | Local JS mock data | No |
| **B — Production** | `VITE_DATA_SOURCE=api` | Laravel REST API + MySQL | Yes |

### Repositories

| Repository | Purpose | Status |
|------------|---------|--------|
| `editorial-web` | React + Vite frontend | ✅ Exists |
| `editorial-backend` | Laravel REST API | ✅ Created |

These are **independent repositories**. Not a monorepo.

---

## Current Phase

```
Phase: 1 — Create Laravel Backend
Status: ✅ COMPLETE
```

## Completed Phases

- [x] **Phase 0** — Inspect & Plan (completed 2026-09-12)
- [x] **Phase 1** — Create Laravel Backend (completed 2026-09-12)

## Next Phase

- [ ] **Phase 2** — First API (Products)

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

| Route | Page | Data Source | Layout |
|-------|------|-------------|--------|
| `/` | LandingPage | Inline + NavLinks | Self-contained |
| `/about` | About | Inline + NavLinks | Self-contained |
| `/products` | ProductPage | Inline + NavLinks | Self-contained |
| `/pricing` | PricingPage | Inline + NavLinks | Self-contained |
| `/services` | ServicePage | Inline + NavLinks | Self-contained |
| `/dashboard` | Dashboard | Inline (stats/charts) | DashboardLayout (top-bar) |
| `/dashboard/profiles` | DashboardProfiles | Inline mock | DashboardLayout |
| `/dashboard/products` | DashboardProducts | **MockProducts** | DashboardLayout |
| `/dashboard/services` | DashboardServices | **MockServices** | DashboardLayout |
| `/dashboard/pricing` | DashboardPricing | **MockPricing** | DashboardLayout |
| `/dashboard/settings` | DashboardSettings | Inline | DashboardLayout |
| `/dashboard2/*` | Dashboard2 variants | Same as above | DashboardSidebarLayout |
| `/login` | Login | Local form state | Self-contained |
| `/register` | Register | Local form state | Self-contained |
| `/forgot-password` | ForgotPassword | Local form state | Self-contained |
| `/unauthorized` | Unauthorized | None | Self-contained |
| `*` | NotFound | None | Self-contained |

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

| Export | Count | Shape | Used By |
|--------|-------|-------|---------|
| `NavLinks` | 6 items | `{key, label, path, subLinks?}` | Navbar on all pages |
| `MockProducts` | 6 items | `{name, type, price, available, status, sku, description}` | Dashboard Products |
| `MockServices` | 3 items | `{name, description, included[], price, billingPeriod, duration, members}` | Dashboard Services |
| `MockPricing` | 3 items | `{name, description, price, billingPeriod, benefits[], duration}` | Dashboard Pricing |

### Entity Schemas (`src/components/data-management/entitySchemas.js`)

Well-defined schemas for `product`, `service`, and `pricing` entities with field types, validation, and display formatting. These schemas will inform the Laravel migrations.

### Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.8 | UI framework |
| react-router-dom | ^7.18.3 | Client-side routing |
| vite | ^8.2.2 | Build tool + dev server |
| tailwindcss | ^4.3.3 | CSS framework |
| next-themes | ^0.4.6 | Dark/light mode |
| lucide-react | ^1.34.0 | Icons |
| motion | ^13.1.1 | Animations |
| gsap | ^3.15.0 | Advanced animations |
| three + @react-three/* | — | 3D visualization (dashboard) |

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

### Phase 1 — Create Laravel Backend
- Create `editorial-backend` as independent Laravel project
- Git initialization (separate repository)
- `.env` + MySQL connection
- Basic `GET /api/health` route to verify
- Verify Laravel runs on `http://localhost:8000`

### Phase 2 — First API (Products)
- Migration: `products` table
- Model: `Product`
- Controller: `ProductController@index`
- Route: `GET /api/products`
- Seeder with sample data matching MockProducts
- Test endpoint independently (browser/curl/Postman)

### Phase 3 — React API Layer
- Create `src/services/api/` directory
- Create `src/services/api/products.js` (fetch-based)
- Create `src/services/api/config.js` (API URL from env)
- Do NOT connect to pages yet

### Phase 4 — Mock/API Switching
- Add `.env` files with `VITE_DATA_SOURCE` and `VITE_API_URL`
- Create data source abstraction (same interface, mock vs API)
- Connect to dashboard products page
- Verify BOTH modes work
- **Major architectural checkpoint**

### Phase 5 — Connect Pages Gradually
- Connect remaining dashboard pages (services, pricing)
- Add loading, error, and empty states
- Create corresponding API endpoints
- Test mock mode + API mode for each

### Phase 6 — CRUD Operations
- `POST /api/products`, `PUT /api/products/{id}`, `DELETE /api/products/{id}`
- Connect React forms (EntityFormModal, EntityDeleteDialog)
- Repeat for services, pricing

### Phase 7 — Production Laravel + MySQL
- Production deployment guide
- `.env.production` configuration
- Migration strategy
- HTTPS, CORS, security

### Phase 8 — Real Domain Frontend
- Configure React for API mode on real domain
- Hosting architecture (same-domain vs subdomain)
- Reverse proxy / routing configuration
- SPA fallback

### Phase 9 — Vercel Mock Deployment
- Configure Vercel env: `VITE_DATA_SOURCE=mock`
- Verify Vercel deployment works independently
- No Laravel dependency for Vercel

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

### `.env` (defaults / Vercel mock)
```
VITE_DATA_SOURCE=mock
```

### `.env.local` (local API development)
```
VITE_DATA_SOURCE=api
VITE_API_URL=http://localhost:8000/api
```

### `.env.production` (real domain)
```
VITE_DATA_SOURCE=api
VITE_API_URL=https://mydomain.com/api
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

- **Git**: clean, branch `main`, commit `7cc7ab3`
- **Build**: not verified this session (existing Vercel deployment works)
- **All mock data intact**: `src/data/exampleData.js` unchanged
- **No API layer exists**: to be created in Phase 3

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

| Phase | Commit | Description |
|-------|--------|-------------|
| Pre-Phase 0 | `7cc7ab3` | Original state before any API work |
| Phase 0 | (pending commit) | Added PROJECT_PLAN.md |
