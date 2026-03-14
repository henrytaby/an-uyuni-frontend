# Tech Stack - UyuniAdmin Frontend

## Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Angular** | v21.1.0 | Core framework |
| **TypeScript** | v5.9.3 | Primary language |
| **Zone.js** | v0.15.0 | Change detection |

## UI Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **PrimeNG** | v21.0.3 | UI component library |
| **@primeuix/themes** | v2.0.1 | Theme system (Aura) |
| **PrimeIcons** | v7.0.0 | Icon library |
| **Tailwind CSS** | v4.1.11 | Utility-first CSS |
| **tailwindcss-primeui** | v0.6.1 | PrimeNG + Tailwind integration |

## State Management

| Technology | Purpose |
|------------|---------|
| **Angular Signals** | Reactive state management (preferred) |
| **RxJS** | v7.8.0 | Async operations and HTTP |

## HTTP & API

| Technology | Purpose |
|------------|---------|
| **HttpClient** | API communication |
| **HTTP Interceptors** | Token injection, loading states |
| **JWT** | Authentication tokens |

## Additional Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| **Chart.js** | v4.5.1 | Data visualization |
| **FullCalendar** | v6.1.20 | Calendar component |
| **Swiper** | v12.1.2 | Touch slider |
| **Flatpickr** | v4.6.13 | Date picker |
| **PrismJS** | v1.30.0 | Syntax highlighting |
| **ng-otp-input** | v2.0.9 | OTP input component |

## Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| **Angular CLI** | v21.0.4 | Build tooling |
| **Angular Build** | v21.0.4 | Vite/Esbuild bundler |
| **ESLint** | v9.39.1 | Code linting |
| **angular-eslint** | v21.1.0 | Angular lint rules |
| **Jest** | v30.2.0 | Testing framework |
| **jest-preset-angular** | v16.0.0 | Angular + Jest integration |

## Build & Bundling

| Tool | Purpose |
|------|---------|
| **Vite** | Development server |
| **Esbuild** | Production bundler |
| **PostCSS** | CSS processing |

## Path Aliases

Configured in `tsconfig.json`:

| Alias | Path | Usage |
|-------|------|-------|
| `@core/*` | `src/app/core/*` | Global services, guards, interceptors |
| `@shared/*` | `src/app/shared/*` | Reusable UI components, layout |
| `@features/*` | `src/app/features/*` | Feature modules |
| `@env/*` | `src/environments/*` | Environment configuration |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Features

- JWT-based authentication
- Refresh token rotation
- HTTP interceptor for token injection
- Role-based access control
- Global error handling

---

*Last updated: March 2026*
