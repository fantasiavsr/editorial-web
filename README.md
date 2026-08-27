# Editorial Web

A modern editorial & design experience built with **React**, **Vite**, **Tailwind CSS v4**, and **Three.js**.

![React](https://img.shields.io/badge/React-19.2-61dafb?logo=react) ![Vite](https://img.shields.io/badge/Vite-8.2-646cff?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3-06b6d4?logo=tailwindcss) ![Three.js](https://img.shields.io/badge/Three.js-r185-000000?logo=three.js)

---

## Features

- **Interactive 3D visuals** via React Three Fiber & Drei
- **Smooth scroll animations** powered by GSAP
- **Dark / Light mode** with `next-themes` and Tailwind v4
- **Responsive landing pages** — Hero, Features, Showcase, Pricing, FAQ, and CTA sections
- **Hash-based routing** for product, pricing, and service pages

---

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview
```

---

## Project Structure

```
src/
  components/     — reusable UI (ThemeToggle, Navbar, etc.)
  sections/        — landing-page sections (Hero, Features, CTA...)
  pages/           — full pages (Landing, Product, Pricing, Service...)
  layouts/         — page layouts (Main, Auth, Dashboard)
  animations/      — shared animation definitions
  hooks/           — custom React hooks
  lib/             — utilities
  data/            — static / mock data
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| 3D / Graphics | Three.js + React Three Fiber |
| Animation | GSAP + Motion |
| Icons | Lucide React |
| Theme | next-themes |

---

## License

Private project — built for editorial and design exploration.
