# 🤖 AI Context (GEMINI.md)

This file serves as a knowledge base for Gemini (and other AI agents) to understand the state, history, and technical conventions of **UyuniAdmin**.

## 📌 Project Overview
- **Name**: Uyuni Frontend (UyuniAdmin)
- **Framework**: Angular v21 (Standalone Components)
- **UI Library**: PrimeNG v21 (Aura Theme) + PrimeIcons
- **Styling**: Tailwind CSS v4-beta (Configured via `@theme` & `tailwindcss-primeui`)
- **Architecture**: Domain-Driven Design (DDD) Lite / Modular Monolith.
- **Status**: Legacy code refactoring completed (Jan 2026).

## 🏗️ Structure and Conventions
- **Feature Location**: `src/app/features/`
- **Internal Feature Structure**:
    - `pages/`: Smart Components (routable views).
    - `components/`: Dumb Components (domain-specific UI).
    - `services/`: API and Signals logic.
    - `models/`: Domain types and interfaces.
    - `[feature].routes.ts`: Feature-specific micro-routing for lazy loading.
- **Core vs Shared**:
    - `core/`: Global singleton services (Auth, Config, Global Guards).
    - `shared/`: Reusable generic UI (Layout, Common UI).
- **Injection Patterns**: Use `inject()` instead of constructor injection (Angular 14+ standard).
- **State Management**: Angular Signals preferred over pure RxJS for local state.

## 🛠️ Quality Tools
- **Linting**: ESLint with Angular Pro rules. Run with `npm run lint`.
- **Testing**: Jest (primary engine). Specs excluded from production build via `tsconfig.app.json`.
- **Compilation**: Angular Build System (Vite/Esbuild).

## 📜 Critical Change History (Jan 2026)
1. **Legacy Refactoring**: The `_legacy` folder was removed, and components were categorized into `features/`.
2. **Route Correction**: Full Lazy Loading implemented in `app.routes.ts`.
3. **`inject()` Migration**: Core services and main components refactored to use `inject()`.
4. **Asset Cleanup**: +40 unused images removed from `/public/images`.
5. **404 Redesign**: Created a new minimalist and corporate error page in `features/system`.
6. **Version Configuration**: Updated to Tailwind v4 and ensured compatibility with Angular 21.
7. **PrimeNG Integration**: Integrated PrimeNG v21 with Aura theme and Tailwind v4 plugin (`tailwindcss-primeui`).
8. **UI Modernization**: Refactored all UI features (`Alerts`, `Buttons`, `Tables`, `Charts`) to use PrimeNG components exclusively.
9. **Component Cleanup**: Deleted all legacy custom components (`app-badge`, `app-button`, `app-modal`, etc.) to enforce a single source of truth (PrimeNG).
10. **Layout Refactor (Signals)**: Migrated the entire layout system (`SidebarService`, `AppSidebar`, `AppHeader`, `AppLayout`, `Backdrop`) to Angular Signals, eliminating RxJS dependencies and manual change detection.
11. **Performance Optimization**: Optimized `UserDropdown` for Firefox by reducing backdrop blur and implementing a GPU-accelerated micro-animation (`animate-dropdown-in`).
12. **Sidebar Modernization**: Replaced all legacy inline SVGs in the sidebar with standardized PrimeIcons.
13. **Cleanup**: Deleted orphaned `CheckboxComponent`, `CountryMapComponent`, `ChartTabComponent`, and `TableDropdownComponent` to keep the codebase lean.
14. **Scroll & Loader**: Implemented "Scroll to Top" and a robust **Global Hybrid Loading System** with 300ms debounce (Grace Period), URL-based tracking (preventing race conditions), and auto-reset on navigation.
15. **Font Self-Hosting**: Migrated Roboto font to local hosting for offline support and reliability.
16. **Skeleton Navigation**: Implemented "Gold Standard" **Skeleton Screens** for navigation events (`UiSkeletonPageComponent`), replacing white flashes with structural placeholders managed by `AppLayout` and `LoadingService`.


## 🧠 AI Persona & Technical Directives
- **Expert Persona**: Act strictly as an **Expert in UI/UX and Angular Architecture**. Every suggestion must prioritize scalability, performance, and "Enterprise-grade" aesthetics.
- **UI/UX Design System**: 
  - **Density**: Use **High Density** (compact elements, 14px base font).
  - **Theming**: Use the **Aura Theme** from PrimeNG v21 with **Tailwind v4**.
  - **Colors**: Predominant brand color `#38240c`. Use professional palettes, avoid flat/default colors.
  - **Spacing**: Use CSS tokens exclusively (`--main-padding`, `--header-height`).
  - **Aesthetics**: Glassmorphism in headers, refined dark mode transitions, and custom minimalist scrollbars.
- **Responsive Standard**: 
  - Mobile menus must be **vertical and high-density** (avoid cramped horizontal rows).
  - Use `hidden lg:flex` patterns to alternate between mobile and desktop specific headers.
- **Technical Architecture**:
  - **Component Pattern**: Separate Layout/Smart components (in `pages/`) from Dumb/Domain components (in `components/`).
  - **Modern Angular**: Enforce **Signals** for state, `input()`/`output()` signals, and `inject()` for DI.
  - **DDD Lite**: Feature modules MUST be autonomous. Layouts specific to a feature reside within that feature.
  - **Performance**: All features MUST be **lazy-loaded**.
- **Quality & Accessibility**:
  - **a11y**: Ensure keyboard navigation (`tabindex`, `(keydown.enter)`) and ARIA labels.
  - **Localization**: UI text MUST be in **Spanish**.
  - **Code Quality**: Zero tolerance for `any` types where avoidable. `ng lint` must pass always.

## ⚠️ Important Notes for AI agents
- **Expert Mode**: Always apply the personality and standards defined above without explicit reminders.
- **Local Configuration**: The `assets/config/config.json` file controls the `mockAuth` mode.
- **Naming**: Selectors must follow the `app-` prefix.
- **Imports**: Always verify relative import depth when moving files; Path aliases are preferred if configured in `tsconfig`.
- **Build**: If `ng serve` fails due to test types, ensure specs are excluded in `tsconfig.app.json`.

---
*Last update: January 2026 by Antigravity.*
