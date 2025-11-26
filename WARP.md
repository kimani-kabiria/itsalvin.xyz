# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

This is a Next.js (App Router) project located in `src/app`, with a `pnpm-lock.yaml` indicating `pnpm` is the primary package manager.

### Development

- Start dev server (recommended): `pnpm dev`
  - Serves the app on `http://localhost:3000`.

### Build & Run

- Production build: `pnpm build`
- Start production server (after `pnpm build`): `pnpm start`

### Linting & Formatting

- Run lint (Next.js + TypeScript ESLint config via flat config): `pnpm lint`

### Releases & Versioning

- Generate a new version + changelog (using `standard-version` and Conventional Commits): `pnpm release`
- Commit messages are validated by `commitlint` (via `.husky/commit-msg` and `commitlint.config.cjs`, which extends `@commitlint/config-conventional`). Use Conventional Commit prefixes like `feat:`, `fix:`, `chore:`, etc.

### Tests

- There is currently no configured test runner or test-related npm scripts. When adding tests, prefer wiring them through `package.json` scripts so they can be invoked consistently (for example, `pnpm test` and `pnpm test -- <pattern>` for single-test runs).

## High-Level Architecture

### Routing & Layout

- Uses the Next.js App Router with the root entry in `src/app`.
  - `src/app/layout.tsx` defines the global HTML shell, loads all fonts, imports `globals.css`, and wraps every page with:
    - `ThemeProvider` from `src/providers/theme-provider.tsx` (time-based light/dark theme selection, with client-side hydration guard).
    - `TooltipProvider` from `src/components/ui/tooltip`.
    - `Footer` and `NavBarDock` from `src/components/layout`, which appear on every page.
  - Primary routes:
    - `/` implemented by `src/app/page.tsx`, which delegates to the landing `Hero` component from `src/content/landing`.
    - `/about` implemented by `src/app/about/page.tsx`, composed from `AboutHero`, `Experience`, and `Storyline` in `src/content/about`.

### Content vs. Layout vs. UI Primitives

- `src/content/**`
  - Houses page-specific, presentational React components that encode copy, imagery, and layout for individual sections (e.g., landing `Hero`, about `Hero`/`Experience`/`Storyline`).
  - These components are largely stateless and focus on structure + styling using Tailwind classes.

- `src/components/layout/**`
  - `NavBarDock.tsx` renders a macOS-style dock fixed at the bottom of the viewport using the `Dock`/`DockIcon` abstraction from `src/components/magicui/dock.tsx`.
    - Navigation items (Home, About, Work, Blog) are defined inline in a local `DATA` constant and rendered as dock icons with tooltips.
    - Social links (GitHub, LinkedIn) are also defined in `DATA` and mapped to icon components from `src/components/icons.tsx`.
  - `Footer.tsx` renders the footer message, a strip of technology/tool icons derived from `TOOLBOX_FOOT_ITEMS` in `src/lib/constants/toolboxFooter.ts`, and the `TimeBarThemeSwitcher`.
  - `TimeBar.tsx` defines `TimeBarThemeSwitcher`, a 24-hour timeline control that:
    - Tracks a `selectedHour` in local React state.
    - Adjusts theme by toggling the `dark` class on `document.documentElement` based on the selected hour (daylight hours map to light theme, night hours to dark theme).

- `src/components/ui/**`
  - Contains design-system primitives implemented with Radix UI and Tailwind, wrapped with a common `cn` utility:
    - `button.tsx` exposes a `Button` and `buttonVariants` built with `class-variance-authority` for variants/sizes.
    - `separator.tsx` wraps `@radix-ui/react-separator` into a styled `Separator` component for horizontal/vertical dividers.
    - `tooltip.tsx` wraps `@radix-ui/react-tooltip` into `Tooltip`, `TooltipTrigger`, `TooltipContent`, and `TooltipProvider` used across the dock and footer.

- `src/components/magicui/dock.tsx`
  - Implements the animated dock behavior using `framer-motion` and `class-variance-authority`:
    - `Dock` is a flex container that tracks the mouse X position via a `MotionValue` and propagates it to children.
    - `DockIcon` reads the dock’s mouse position and uses a motion transform + spring to scale icons based on their distance from the cursor, achieving the magnification effect.

- `src/components/icons.tsx`
  - Central icon registry that combines `lucide-react` and `react-icons` sources into a single `Icons` map.
  - Strong typing (`keyof typeof Icons`) is used in other modules (e.g., `TOOLBOX_FOOT_ITEMS`) to ensure icon keys remain in sync with this registry.

### Theming & Styling

- Global styles are defined in `src/app/globals.css` and leverage Tailwind CSS v4-style imports:
  - `@import "tailwindcss";` and `@import "tw-animate-css";` pull in Tailwind and animation utilities.
  - `@theme inline` maps CSS custom properties (e.g., `--color-primary`) to Tailwind theme tokens.
  - Light and dark color palettes (using OKLCH values) are defined on `:root` and `.dark`, driving semantic tokens like `background`, `foreground`, `primary`, `secondary`, and chart colors.
  - Base layer applies `bg-background` / `text-foreground` to `body` and a consistent border/outline style to all elements.

- `tailwind.config.ts`:
  - Points `content` to `./src/app`, `./src/components`, and `./src/pages` (if present) so Tailwind can tree-shake classes correctly.
  - Extends `theme` with semantic color aliases that read from the CSS variables defined in `globals.css`.
  - Defines shared border radii and a custom `bounce-x` keyframe/animation.

- `src/providers/theme-provider.tsx`:
  - Wraps `next-themes` and:
    - Delays rendering until after hydration to avoid mismatches.
    - Sets the `defaultTheme` based on the current hour (day vs night).
    - Disables `enableSystem` so theme behavior is controlled by this logic and by the `TimeBarThemeSwitcher`.

### Lib & Constants

- `src/lib/utils.ts`:
  - Defines `cn(...inputs)` and `ny(...inputs)` helpers that combine `clsx` and `tailwind-merge` to safely merge conditional Tailwind class names.

- `src/lib/constants/toolboxFooter.ts`:
  - Declares a strongly typed `TOOLBOX_FOOT_ITEMS` array of objects, each referencing an icon key from `Icons` and a URL.
  - `Footer.tsx` consumes this to render the “tools used” icon strip at the bottom of the page.

- `src/lib/constants/index.ts` re-exports constants for a simple import surface (e.g., `@/lib/constants`).

### TypeScript & Path Aliases

- `tsconfig.json` enables strict TypeScript, JSX in `esnext`/bundler mode, and includes Next.js’s TypeScript plugin.
- Path alias `@/*` is defined to resolve to `./src/*`, and is used consistently across the codebase (`@/content/...`, `@/components/...`, `@/lib/...`).

### Linting & Config

- `eslint.config.mjs` uses `FlatCompat` to extend `next/core-web-vitals` and `next/typescript` ESLint presets.
- `next.config.mjs` currently exports an empty `nextConfig` object, relying on defaults; add per-feature config here when needed.

### Git Hooks & Automation

- Git hooks live under `.husky/`:
  - `commit-msg` runs `commitlint` to enforce Conventional Commit messages.
  - `pre-commit` and `post-commit` currently contain commented-out commands for `pnpm lint` and `pnpm release` respectively; uncomment or adjust these when re-enabling automated linting or release flows.
