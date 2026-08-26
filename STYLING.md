# Styling Documentation — Editorial Web Landing

## Color Palette (Tailwind CSS v4)

Defined in `src/index.css` using `@theme` block:

| Color Class | Hex | Usage |
|---|---|---|
| `primary-black` | `#000000` | Main text, headings, borders |
| `primary-white` | `#ffffff` | Background, cards, surfaces |
| `primary-orange` | `#fe7141` | **Accent only**: CTAs, important numbers, links |
| `primary-purple` | `#cdabfe` | (reserved for accents) |
| `primary-sage` | `#d1ddd3` | (reserved for accents) |

## Typography Scale
- Hero title: `text-5xl md:text-8xl` (black)
- Section titles: `text-4xl md:text-6xl` (black)
- Headings: `text-2xl` (black)
- Body text: `text-base`/`text-sm` (60% black)
- Meta text: `text-xs` (50% black)

## Layout
- Container: `max-w-7xl mx-auto`
- Padding: `px-8 md:px-16`
- Grid: `grid md:grid-cols-3`/`4` gap `gap-10`/`4`
- Corners: `rounded-2xl`
- Borders: `border-primary-black/10`

## Components

### Primary CTA Button
```jsx
className="inline-flex items-center gap-2 text-sm font-medium bg-primary-orange text-primary-white px-6 py-3 rounded-full hover:bg-primary-black transition-all"
```

### Section Header
```jsx
className="text-xs uppercase tracking-[0.2em] text-primary-black/50 mb-6"
```

### Card
```jsx
className="group block p-6 rounded-2xl border border-primary-black/10 hover:border-primary-black hover:-translate-y-1 transition-all bg-primary-white"
```

### Case Study Card (Available)
```jsx
className="p-6 rounded-2xl border bg-primary-black text-primary-white border-primary-black hover:-translate-y-1 transition-all"
```

### Case Study Card (Coming Soon)
```jsx
className="p-6 rounded-2xl border bg-primary-white border-primary-black/10 text-primary-black/50 hover:-translate-y-1 transition-all"
```

### Footer Links
```jsx
className="hover:text-primary-orange transition-colors"
```

## Scrollbar
```css
::-webkit-scrollbar { width: 12px; }
::-webkit-scrollbar-track { background: #f3f3f3; border-radius: 8px; }
::-webkit-scrollbar-thumb { background: #fe7141; border-radius: 8px; }
```