# Technical Decisions & Lessons Learned - UyuniAdmin Frontend

## Key Technical Decisions

### 1. Angular v21 with Standalone Components

**Decision**: Use Angular v21 with Standalone Components architecture, eliminating NgModules.

**Rationale**:
- Better tree-shaking and smaller bundles
- Simpler dependency management
- Modern Angular best practice
- Future-proof architecture

**Trade-offs**:
- Requires learning new patterns for developers used to NgModules
- Some third-party libraries may not fully support standalone

---

### 2. Signals over RxJS for State

**Decision**: Use Angular Signals for local component state, RxJS only for async operations.

**Rationale**:
- Simpler mental model for state management
- Better performance with fine-grained reactivity
- Less boilerplate than BehaviorSubject patterns
- Official Angular recommendation

**Trade-offs**:
- Signals are relatively new, ecosystem still evolving
- Some RxJS operators don't have Signal equivalents

---

### 3. PrimeNG as UI Library

**Decision**: Use PrimeNG v21 as the primary UI component library.

**Rationale**:
- Comprehensive enterprise-grade components
- Built-in accessibility
- Active maintenance and community
- Aura theme provides modern aesthetics

**Trade-offs**:
- Larger bundle size than minimal libraries
- Customization requires CSS overrides
- Some components may be overkill for simple use cases

---

### 4. Tailwind CSS v4

**Decision**: Use Tailwind CSS v4 with PrimeNG integration.

**Rationale**:
- Utility-first approach speeds development
- Excellent for responsive design
- PrimeUI plugin ensures compatibility
- Custom design system support

**Trade-offs**:
- Learning curve for developers new to utility classes
- Can lead to inconsistent styling if not disciplined
- Requires proper configuration for dark mode

---

### 5. DDD Lite Architecture

**Decision**: Implement Domain-Driven Design Lite instead of full Clean Architecture.

**Rationale**:
- Pragmatic balance between structure and velocity
- Avoids over-engineering for typical CRUD operations
- Clear separation of concerns without excessive abstraction
- Easier for new developers to understand

**Trade-offs**:
- Less strict boundaries than hexagonal architecture
- May need refactoring for very complex domains
- Services can become god objects if not careful

---

### 6. Path Aliases (Mandatory)

**Decision**: Enforce path aliases (`@core`, `@shared`, `@features`) for all cross-module imports.

**Rationale**:
- Eliminates "import hell" (`../../../../`)
- Makes refactoring easier
- Clear indication of dependency direction
- Professional codebase standard

**Trade-offs**:
- Requires tsconfig configuration
- IDE support varies
- New developers need to learn the aliases

---

### 7. inject() over Constructor Injection

**Decision**: Use `inject()` function for dependency injection.

**Rationale**:
- More concise syntax
- Works in functional contexts (interceptors, guards)
- Better type inference
- Modern Angular standard

**Trade-offs**:
- Breaking change from traditional Angular patterns
- Some developers may be unfamiliar

---

### 8. localStorage for Token Storage

**Decision**: Store JWT tokens in localStorage.

**Rationale**:
- Persistence across browser sessions and tabs
- Simple implementation
- Works well for admin dashboards (not public-facing)

**Trade-offs**:
- Vulnerable to XSS attacks (mitigated by proper CSP)
- Not as secure as httpOnly cookies
- Consider migration to secure cookies for public apps

---

## Lessons Learned

### 1. Circular Dependencies

**Problem**: `LoggerService` initially injected `ConfigService`, which created a circular dependency when `ConfigService` needed to log.

**Solution**: Refactored `LoggerService` to not depend on `ConfigService`. Logger now has its own configuration.

**Lesson**: Be mindful of dependency graphs. Services that are dependencies of many others should have minimal dependencies themselves.

---

### 2. Global State in Interceptors

**Problem**: Using global variables in HTTP interceptors caused issues with concurrent requests and token refresh.

**Solution**: Created `TokenRefreshService` to encapsulate refresh state with proper Signal-based state management.

**Lesson**: Avoid module-level global state. Use services with Signals for shared state.

---

### 3. CSS Empty Selector Warning

**Problem**: Tailwind CSS v4 `@variant dark` nested inside `&:hover` generated empty selectors.

**Solution**: Moved dark mode styles to standalone `.dark` selector block.

**Lesson**: Understand how CSS preprocessors generate selectors. Test build output for warnings.

---

### 4. Loading Spinner Orphaned

**Problem**: Loading spinner in `AppLayoutComponent` would disappear during navigation to auth pages.

**Solution**: Moved loading spinner to `AppComponent` (root level) so it persists across all route changes.

**Lesson**: Global UI elements should be at the highest level needed for their lifecycle.

---

### 5. PrimeNG Theme Migration

**Problem**: `@primeng/themes` was deprecated in favor of `@primeuix/themes`.

**Solution**: Updated imports and package dependency to use `@primeuix/themes`.

**Lesson**: Monitor package deprecation warnings and migrate proactively.

---

### 6. Security Vulnerabilities in Dependencies

**Problem**: Swiper v11 had a critical security vulnerability.

**Solution**: Updated to Swiper v12 which patched the vulnerability.

**Lesson**: Run `npm audit` regularly. Update dependencies promptly.

---

## Anti-Patterns to Avoid

### 1. God Services
```typescript
// ❌ BAD: Service doing too much
@Injectable({ providedIn: 'root' })
export class AppService {
  login() { }
  logout() { }
  getUsers() { }
  getProducts() { }
  saveInvoice() { }
  // ... 50 more methods
}

// ✅ GOOD: Focused services
@Injectable({ providedIn: 'root' })
export class AuthService {
  login() { }
  logout() { }
}
```

### 2. Deep Relative Imports
```typescript
// ❌ BAD
import { AuthService } from '../../../../core/auth/auth.service';

// ✅ GOOD
import { AuthService } from '@core/auth/auth.service';
```

### 3. Console.log in Production
```typescript
// ❌ BAD
console.log('User logged in:', user);

// ✅ GOOD
this.logger.info('User logged in:', user);
```

### 4. Business Logic in Components
```typescript
// ❌ BAD: Component handling auth errors directly
export class SignInComponent {
  login() {
    this.authService.login(user, pass).subscribe({
      error: (err) => {
        if (err.status === 401) {
          // Handle 401
        } else if (err.status === 403) {
          // Handle 403
        }
        // ... more error handling
      }
    });
  }
}

// ✅ GOOD: Use error handler service
export class SignInComponent {
  private readonly errorHandler = inject(AuthErrorHandlerService);
  
  login() {
    this.authService.login(user, pass).subscribe({
      error: (err) => this.errorHandler.handleAuthError(err)
    });
  }
}
```

### 5. Any Types
```typescript
// ❌ BAD
function processData(data: any) { }

// ✅ GOOD
interface UserData {
  id: string;
  name: string;
}

function processData(data: UserData) { }
```

---

## Performance Best Practices

### 1. Lazy Loading
```typescript
// All features lazy-loaded
{
  path: 'dashboard',
  loadChildren: () => import('@features/dashboard/dashboard.routes')
    .then(m => m.routes)
}
```

### 2. OnPush Change Detection
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 3. TrackBy in ngFor
```html
<tr *ngFor="let item of items; trackBy: trackById">
```

### 4. Computed Signals
```typescript
// Derive state instead of duplicating
fullName = computed(() => 
  `${this.user()?.firstName} ${this.user()?.lastName}`
);
```

---

## Future Considerations

### Potential Improvements
1. **E2E Testing**: Add Playwright or Cypress
2. **State Management**: Consider NgRx for complex features
3. **API Layer**: Add repository pattern for complex API interactions
4. **Internationalization**: Add i18n support if needed
5. **Monitoring**: Add error tracking (Sentry, LogRocket)
6. **Performance**: Add bundle analysis and performance budgets

### Migration Path
- Angular updates: Follow official migration guides
- PrimeNG updates: Check breaking changes in changelog
- Tailwind updates: Review configuration changes

---

*Last updated: March 2026*
