# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Uyuni Frontend** is an Angular 21 enterprise admin dashboard application using:
- Angular 21 with standalone components (no NgModules)
- TailwindCSS v4 for styling
- PrimeNG v21 for UI components
- Jest for unit testing
- Domain-Driven Design (DDD) Lite architecture

## Common Commands

```bash
# Development server (runs on http://localhost:4200)
npm start

# Build for production
npm run build

# Build in watch mode (development)
npm run watch

# Run all tests
npm test

# Run tests for a specific file
npm test -- path/to/component.spec.ts

# Run tests with coverage
npm test -- --coverage

# Lint the codebase
npm run lint

# Lint and fix issues
npx eslint --fix src/
```

## Architecture Overview

The project follows **DDD Lite** with a **Modular Monolith** structure:

```
src/app/
├── core/           # Singletons: Auth, Config, Guards, Interceptors, Services
├── shared/         # Reusable UI components, layouts, pipes
└── features/       # Business modules: dashboard, invoice, auth, etc.
```

### Key Architectural Principles

1. **Standalone Components Only**: No NgModules except for legacy library configs
2. **Lazy Loading**: All features are lazy-loaded via `*.routes.ts` files
3. **Path Aliases (Mandatory)**: Never use relative imports between modules
   - `@core/*` → `src/app/core/*`
   - `@shared/*` → `src/app/shared/*`
   - `@features/*` → `src/app/features/*`
   - `@env/*` → `src/environments/*`
4. **Smart vs Dumb Components**:
   - Smart (Pages): In `features/*/pages/`, inject services, manage state
   - Dumb (Components): In `shared/components/` or `features/*/components/`, only use @Input/@Output
5. **ChangeDetectionStrategy.OnPush**: Used on all 52+ components for performance

### Feature Module Structure

Each feature in `src/app/features/<name>/` follows this structure:

```
feature-name/
├── pages/              # Smart components (routed views)
├── components/         # Dumb components (specific to feature)
├── models/             # Domain interfaces/types
├── services/           # HTTP services for this domain
└── *.routes.ts         # Lazy-loaded routes
```

Example route registration in `app.routes.ts`:
```typescript
{
  path: 'invoice',
  loadChildren: () => import('@features/invoice/invoice.routes').then(m => m.routes)
}
```

## Core Services

### Auth System (`src/app/core/auth/`, `src/app/core/guards/`, `src/app/core/interceptors/`)

- **AuthService**: Manages tokens, user state (Signals), roles, menu fetching
- **authGuard**: Protects routes, redirects to /signin
- **authInterceptor**: Adds Bearer tokens, handles 401 with automatic token refresh
- **TokenRefreshService**: Queues requests during token refresh to prevent race conditions

Key auth patterns:
- Tokens stored in localStorage (`access_token`, `refresh_token`)
- Multi-tenant role support with `X-Active-Role` header
- Automatic token refresh on 401 errors (except auth endpoints)

### Loading Service (`src/app/core/services/loading.service.ts`)

Global loading state with request counter (prevents race conditions):
- Debounced display (300ms) to prevent flicker
- Fail-safe timeout (6s) to prevent stuck loaders
- Automatically resets on navigation start

### Config Service (`src/app/core/config/config.service.ts`)

Loads runtime configuration from `public/assets/config/config.json` (not in repo):
```bash
# Copy example config for local development
cp public/assets/config/config.example.json public/assets/config/config.json
```

Supports mock auth for development via `featureFlags.mockAuth`.

## Testing

- **Framework**: Jest with jest-preset-angular
- **Setup**: `src/setup-jest.ts`
- **Coverage thresholds**: 70% branches, 75% functions, 80% lines/statements
- **Module path mapping**: Configured in `jest.config.js` to match tsconfig aliases

Running specific tests:
```bash
# Single file
npm test -- src/app/core/services/loading.service.spec.ts

# Pattern
npm test -- --testPathPattern="auth"
```

## Pre-commit Hooks

Husky + lint-staged configured in `.husky/pre-commit`:
- Runs `eslint --fix` on staged `.ts` and `.html` files
- Auto-adds fixed files to commit

## Component Conventions

### Component Template
```typescript
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
  selector: 'app-component-name',  // prefix: app, style: kebab-case
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,  // Always OnPush
  imports: [...],
  templateUrl: './component-name.component.html',
  styleUrl: './component-name.component.css'  // Note: singular styleUrl
})
export class ComponentNameComponent {
  // Use inject() for dependency injection
  private service = inject(ServiceName);
}
```

### ESLint Rules
- Component selector: element, `app` prefix, kebab-case
- Directive selector: attribute, `app` prefix, camelCase

## Styling

- **TailwindCSS v4**: Uses `@import "tailwindcss"` in `src/styles.css`
- **PrimeUI**: Tailwind plugin for PrimeNG theming
- **CSS validation disabled** in VS Code settings (uses PostCSS)

## Important Files

| File | Purpose |
|------|---------|
| `src/app/app.routes.ts` | Main router with lazy loading config |
| `src/app/app.component.ts` | Root component with global loader |
| `tsconfig.json` | Path aliases configuration |
| `jest.config.js` | Test configuration with module mapping |
| `eslint.config.js` | ESLint with Angular rules |
| `angular.json` | Build config, budgets (4MB warning, 5MB error) |

## Documentation

Additional docs in `docs/`:
- `ARCHITECTURE.md` - Full architecture guide
- `CHANGE_DETECTION_ONPUSH_GUIDE.md` - OnPush patterns
- `LOADING_SKELETON_SYSTEM.md` - Loading state system
- `NETWORK_RESILIENCE.md` - Error handling
- `UNIT_TESTING_GUIDE.md` - Testing patterns
