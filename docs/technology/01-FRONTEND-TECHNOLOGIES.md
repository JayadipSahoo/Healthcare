# Frontend Technologies

> What we use, why, how, and alternatives.

---

## 1. Next.js 14 (App Router)

### What

React framework with App Router, Server Components, Server Actions.

### Why Used

- Full-stack in one codebase (pages + API + server logic)
- Server Components for data fetching without client JS
- Server Actions for mutations without separate REST API
- Built-in routing, image optimization, SSR

### How Used

- **App Router**: `app/` directory, layouts, pages
- **Server Components**: Most pages (admin, register, etc.)
- **Client Components**: Forms, tables, modals (`"use client"`)

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **Create React App** | No SSR, no server actions, deprecated |
| **Remix** | Good, but smaller ecosystem; Next.js more common |
| **Vite + React** | No built-in server; would need separate backend |

---

## 2. React 18

### What

UI library with concurrent features.

### Why Used

- De facto standard for SPA/SSR
- Strong ecosystem, hooks, concurrent rendering

### How Used

- All UI built with React components
- Hooks: `useState`, `useEffect`, `useForm`, etc.

---

## 3. Tailwind CSS

### What

Utility-first CSS framework.

### Why Used

- Fast styling without context switching
- Consistent design tokens (colors, spacing)
- Dark theme via classes (dark-400, green-500)
- Smaller bundle than component libraries

### How Used

- `tailwind.config.ts` – Custom colors, fonts
- `globals.css` – @apply utilities
- All components use Tailwind classes

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **CSS Modules** | More verbose, no design system |
| **Styled Components** | Runtime cost, larger bundle |
| **Bootstrap** | Less flexible, generic look |

---

## 4. shadcn/ui (Radix Primitives)

### What

Copy-paste component library built on Radix UI.

### Why Used

- Accessible (Radix)
- Full control (code lives in repo)
- Tailwind-based
- No heavy runtime dependency

### How Used

- `components/ui/` – Button, Dialog, Input, Select, Form, Table, etc.
- Customized via Tailwind in `globals.css` (shad-* classes)

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **Material UI** | Large bundle, opinionated styling |
| **Chakra UI** | Heavier, different design language |
| **Headless UI** | Fewer components |

---

## 5. Lucide React

### What

Icon library (icons as React components).

### Why Used

- Lightweight, tree-shakeable
- Consistent design
- No external font/asset needed

### How Used

- Icons like `Download`, `Search`, `Check`, etc.
- Records table, buttons

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **Font Awesome** | Heavier, font-based |
| **Heroicons** | Similar; Lucide has more icons |

---

## 6. @tanstack/react-table

### What

Headless table library.

### Why Used

- Flexible column definitions
- Built-in pagination
- No styling imposed
- TypeScript-friendly

### How Used

- `DataTable` component
- `columns` and `recordsColumns`
- Pagination, sorting-ready

### Alternatives & Why Not

| Alternative | Why Not Chosen |
|-------------|----------------|
| **AG Grid** | Heavier, commercial for advanced features |
| **MUI DataGrid** | Tied to MUI |

---

## [← Features](../README.md) | [Back to Docs](../README.md) | [Next: Backend & Data →](./02-BACKEND-DATA.md)
