# Dark Theme Implementation Guide

## Overview

This project uses **next-themes** package with **Tailwind CSS v4** for seamless light/dark theme switching.

## Files Modified/Created

### 1. `src/index.css` - Theme Variables
Defines CSS variables for both light and dark themes:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --border-primary: rgba(0, 0, 0, 0.1);
}

.dark {
  --bg-primary: #0a0a0a;
  --text-primary: #ffffff;
  --border-primary: rgba(255, 255, 255, 0.1);
}
```

Also includes dark mode scrollbar styling:
```css
::-webkit-scrollbar-track { background: #f3f3f3; }
.dark ::-webkit-scrollbar-track { background: #1a1a1a; }
```

### 2. `src/App.jsx` - ThemeProvider Setup
Wraps the entire app with next-themes provider:

```jsx
import { ThemeProvider } from 'next-themes';

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <LandingPage />
    </ThemeProvider>
  );
}
```

**Options:**
- `attribute="class"` — Adds/removes `.dark` class on root element
- `defaultTheme="light"` — Default theme on first visit
- `enableSystem` — Auto-detect system preference (prefers-color-scheme)

### 3. `src/components/ThemeToggle.jsx` - Toggle Button
React component with theme switching:

```jsx
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Prevent hydration mismatch
  }, []);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

**Key points:**
- `useEffect` prevents flash of unstyled content (FOUC)
- `setTheme()` updates theme and saves to localStorage
- Shows appropriate icon based on current theme

### 4. `src/pages/landing/LandingPage.jsx` - Dark Mode Classes
All UI elements use `dark:` prefix for dark theme styles:

```jsx
// Background + text
className="bg-primary-white dark:bg-[#0a0a0a] text-primary-black dark:text-primary-white"

// Borders
className="border-primary-black/10 dark:border-primary-white/10"

// Cards (dark mode)
className="bg-primary-white dark:bg-[#1a1a1a]"

// Hover states
className="hover:bg-primary-black dark:hover:bg-primary-white"
```

## How It Works

1. **On Page Load:**
   - Check localStorage for saved theme preference
   - If dark mode is saved, add `.dark` class to `<html>` before rendering
   - Prevents white flash on dark mode users

2. **User Clicks Toggle:**
   - next-themes updates theme in localStorage
   - Adds/removes `.dark` class on root element
   - Tailwind switches `dark:` utilities immediately

3. **System Preference:**
   - If no saved preference, uses `prefers-color-scheme` media query
   - Respects OS dark mode setting

## Common Patterns

### Text Colors
```jsx
className="text-primary-black dark:text-primary-white"
```

### Background Colors
```jsx
className="bg-primary-white dark:bg-[#0a0a0a]"
```

### Borders
```jsx
className="border-primary-black/10 dark:border-primary-white/10"
```

### Hover States
```jsx
className="hover:text-primary-orange dark:hover:text-primary-orange"
// Orange stays same in both themes
```

### Disabled/Muted States
```jsx
className="text-primary-black/50 dark:text-primary-white/50"
```

## Adding Dark Mode to New Components

When creating new components:

1. Import theme hook if needed:
   ```jsx
   import { useTheme } from 'next-themes';
   ```

2. Add dark mode classes to every element:
   ```jsx
   <div className="bg-primary-white dark:bg-[#1a1a1a]">
     <h1 className="text-primary-black dark:text-primary-white">Title</h1>
     <p className="text-primary-black/60 dark:text-primary-white/60">Body</p>
   </div>
   ```

3. Test both light and dark modes in browser:
   - Click theme toggle in navigation
   - Verify all text remains readable
   - Check contrast ratios

## Browser Storage

Theme preference saved as:
```
localStorage.key: "theme"
localStorage.value: "light" | "dark" | "system"
```

Users can manually clear this to reset to system preference.

## Troubleshooting

### White flash on page load (FOUC)
→ Ensure FOUC prevention script runs in LandingPage.jsx before main content renders

### Theme not persisting
→ Check browser localStorage isn't cleared
→ Verify ThemeProvider wraps entire app in App.jsx

### Hydration mismatch error
→ Add `useEffect` hook with `setMounted(true)` in toggle component

## Performance Notes

- **next-themes** is lightweight (~5KB)
- No runtime stylesheet switching — uses CSS class toggle
- Dark mode CSS already in main bundle via Tailwind
- System preference detection has zero JavaScript overhead
