# 🤖 AI Context (GEMINI.md)

This file serves as a knowledge base for Gemini (and other AI agents) to understand the state, history, and technical conventions of **UyuniAdmin**.

## 📌 Project Overview
- **Name**: Uyuni Frontend (UyuniAdmin)
- **Framework**: Angular v21 (Standalone Components)
- **Styling**: Tailwind CSS v4-beta (Configured via `@theme` in `styles.css`)
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

## ⚠️ Important Notes for AI agents
- **Local Configuration**: The `assets/config/config.json` file controls the `mockAuth` mode.
- **Naming**: Selectors must follow the `app-` prefix.
- **Imports**: Always verify relative import depth when moving files; Path aliases are preferred if configured in `tsconfig`.
- **Build**: If `ng serve` fails due to test types, ensure specs are excluded in `tsconfig.app.json`.

---
*Last update: January 2026 by Antigravity.*
