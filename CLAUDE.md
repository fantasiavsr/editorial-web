# Project Instructions

## Project Structure

This is an existing React + Vite project.

The existing project structure is intentional. Preserve and reuse it.

### Directory Structure

- `src/components/` — reusable UI components
- `src/components/ui/` — generic UI components such as Button, Card, Badge, Input
- `src/components/navigation/` — Navbar, Sidebar, Tabs, Breadcrumb
- `src/components/feedback/` — Modal, Toast, Loading, EmptyState
- `src/layouts/` — reusable page layouts
- `src/pages/` — complete pages
- `src/pages/landing/` — landing page
- `src/pages/auth/` — login, register, authentication pages
- `src/pages/dashboard/` — dashboard pages
- `src/pages/profile/` — profile pages
- `src/pages/pricing/` — pricing pages
- `src/pages/about/` — about pages
- `src/pages/contact/` — contact pages
- `src/pages/error/` — error pages
- `src/sections/` — reusable landing-page sections
- `src/animations/` — shared animation definitions
- `src/hooks/` — reusable React hooks
- `src/lib/` — utilities and helper functions
- `src/data/` — static/mock data
- `src/assets/` — images, fonts, and other assets

## Important Rules

1. DO NOT create a new React project.
2. DO NOT recreate the existing project structure.
3. DO NOT move files or folders unless explicitly requested.
4. Reuse existing components before creating new ones.
5. Before creating a new component, inspect `src/components/` for an existing component that can be reused.
6. Before creating a new section, inspect `src/sections/` for reusable sections.
7. Put complete pages inside the appropriate `src/pages/` directory.
8. Put reusable UI components inside `src/components/`.
9. Put reusable landing-page sections inside `src/sections/`.
10. Keep page-specific components close to their page when they are not reusable.
11. Do not create unnecessary folders.
12. Do not create duplicate components.
13. Do not install new npm packages unless absolutely necessary.
14. Use the existing dependencies whenever possible.
15. Preserve the existing Vite and React configuration.
16. Do not modify `package.json` unless necessary.
17. Do not modify configuration files unless necessary.

## Tailwind CSS v4 Configuration

This project uses **Tailwind CSS v4** with the `@tailwindcss/vite` plugin. Follow these rules to avoid styling issues:

### Custom Colors
- Define custom colors in `src/index.css` using the `@theme` block, NOT in `tailwind.config.js`
- Example:
  ```css
  @theme {
    --color-primary-orange: #fe7141;
    --color-primary-purple: #cdabfe;
    --color-primary-sage: #d1ddd3;
  }
  ```
- Reference colors in Tailwind classes: `bg-primary-orange`, `text-primary-purple`, `border-primary-sage`

### Tailwind Class Generation
- Tailwind requires full class names as literal strings — dynamic class names do NOT work
- ❌ Bad: `className={`text-${colorVariable}`}`
- ✅ Good: `className="text-primary-orange"`
- Always write complete class names when using variable data — use conditional logic or separate elements

### Safe Patterns
- Use conditional className: `className={condition ? "text-primary-orange" : "text-primary-black"}`
- Use ternary in template strings: `className={`${ready ? "bg-primary-orange" : "bg-primary-white"}`}`
- Expand `.map()` loops into static JSX if colors vary by item

## Before Making Changes

First inspect the existing project structure and relevant files.

Understand the existing components, layouts, pages, and dependencies before implementing anything.

Prefer modifying and extending the existing architecture rather than replacing it.

## React Guidelines

- Use functional components.
- Use reusable components.
- Keep components reasonably small.
- Avoid unnecessary abstraction.
- Avoid duplicating UI.
- Keep data separate from presentation when appropriate.
- Use semantic HTML.
- Keep the application responsive.

## Dark Mode / Theme System

This project uses **next-themes** for theme management with Tailwind CSS v4 dark mode support.

### Tailwind v4 Dark Mode Configuration (CRITICAL)

Tailwind CSS v4 with `@tailwindcss/vite` does NOT read `tailwind.config.js`. Dark mode MUST be configured in `src/index.css`:

```css
@import "tailwindcss";

/* Enable class-based dark mode variant */
@variant dark (&:where(.dark, .dark *));

@theme {
  /* Your custom colors here */
  --color-primary-black: #000000;
  --color-primary-white: #ffffff;
  --color-primary-dark-bg: #0a0a0a;
  --color-primary-dark-card: #1a1a1a;
}
```

**Why this matters:**
- `@variant dark (&:where(.dark, .dark *));` generates `.dark\:` prefixed selectors in the CSS output
- Without this, Tailwind v4 generates only `@media (prefers-color-scheme: dark)` selectors, which don't respond to `.dark` class changes
- The `:where(.dark, .dark *)` scoping ensures dark mode applies when `.dark` class is on `<html>` or any parent element

**Do NOT:**
- ❌ Add `darkMode: 'class'` to `tailwind.config.js` — it's ignored in Tailwind v4
- ❌ Remove the `@variant` directive — dark mode won't generate

### Configuration

**CSS Setup (src/index.css):**
```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --color-primary-black: #000000;
  --color-primary-white: #ffffff;
  --color-primary-dark-bg: #0a0a0a;
  --color-primary-dark-card: #1a1a1a;
}

@layer base {
  html.dark {
    color-scheme: dark;
  }

  /* Custom scrollbar for dark mode */
  .dark ::-webkit-scrollbar-track {
    background: #1a1a1a;
  }

  .dark * {
    scrollbar-color: #fe7141 #1a1a1a;
  }
}
```

**Theme Provider (src/App.jsx):**
- Wraps app with `<ThemeProvider attribute="class" defaultTheme="light" enableSystem>`
- Automatically detects system preference
- Persists user choice to localStorage

### Using Dark Mode in Components

Add `dark:` prefix to Tailwind classes:

```jsx
className="bg-primary-white dark:bg-primary-dark-bg text-primary-black dark:text-primary-white"
```

**Common dark mode patterns:**
- `text-primary-black dark:text-primary-white`
- `bg-primary-white dark:bg-primary-dark-card`
- `border-primary-black/10 dark:border-primary-white/10`
- `hover:bg-primary-black dark:hover:bg-primary-white`

### Theme Toggle Component

Located at `src/components/ThemeToggle.jsx`:
- Uses `useTheme()` hook from next-themes
- Handles hydration safely with `useEffect`
- Shows sun/moon icons from lucide-react
- Integrates into navigation bar

### Preventing Flash of Unstyled Content (FOUC)

Script in `src/pages/landing/LandingPage.jsx`:
```jsx
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
}
```

### How It Works

1. **On Page Load:**
   - FOUC script checks localStorage for saved theme
   - If dark mode is saved, adds `.dark` class to `<html>` before rendering
   - CSS variant targets `.dark` class with `:where()` selector

2. **User Clicks Toggle:**
   - `ThemeProvider` updates theme in localStorage
   - Adds/removes `.dark` class on root element
   - Tailwind's `.dark\:` utilities respond immediately

3. **System Preference:**
   - If no saved preference, uses `prefers-color-scheme` media query
   - Respects OS dark mode setting