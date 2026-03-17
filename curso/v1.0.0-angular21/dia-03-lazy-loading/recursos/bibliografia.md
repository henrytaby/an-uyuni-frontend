# Bibliografía y Recursos - Día 3

## Libros Recomendados

### Angular Routing

| Libro | Autor | Año | Relevancia |
|-------|-------|-----|------------|
| **Angular Router** | Victor Savkin | 2017 | Especializado en routing |
| **Angular in Action** | Jeremy Wilken | 2018 | Capítulo de routing |
| **Ng-Book** | Nate Murray | 2023 | Routing completo |

---

## Documentación Oficial

### Angular Router

- [Angular Router Guide](https://angular.io/guide/router)
- [Lazy Loading](https://angular.io/guide/lazy-loading-ngmodules)
- [Route Guards](https://angular.io/guide/router-tutorial-toh#canactivatechild-guarding-child-routes)
- [Resolvers](https://angular.io/guide/router-tutorial-toh#resolve-prefetching-route-data)
- [Router API](https://angular.io/api/router)

---

## Artículos y Blogs

### Lazy Loading

1. **"Lazy Loading in Angular"** - Angular University
   - Guía completa de lazy loading
   - https://blog.angular-university.io/angular-lazy-loading/

2. **"Angular Performance Optimization"** - Minko Gechev
   - Optimización con lazy loading
   - https://blog.mgechev.com/

3. **"Code Splitting Patterns"** - Webpack Docs
   - Patrones de code splitting
   - https://webpack.js.org/guides/code-splitting/

### Route Guards

1. **"Angular Route Guards"** - Thoughtram
   - Explicación detallada
   - https://blog.thoughtram.io/angular/2016/07/18/angular-2-route-guards.html

2. **"Functional Guards in Angular 14"** - Tim Deschryver
   - Guards modernos
   - https://timdeschryver.github.io/

3. **"Authentication with Guards"** - Angular University
   - Implementación práctica
   - https://blog.angular-university.io/

### Resolvers

1. **"Angular Resolvers"** - Netanel Basal
   - Patrones de uso
   - https://netbasal.com/

2. **"Preloading Data with Resolvers"** - Angular in Depth
   - Casos avanzados
   - https://indepth.dev/

---

## Videos

### YouTube - Canales Recomendados

| Canal | Contenido | Idioma |
|-------|-----------|--------|
| **Angular** | Oficial Angular | Inglés |
| **Fireship** | Videos cortos | Inglés |
| **Angular University** | Tutoriales completos | Inglés |

### Videos Específicos

1. **"Angular Router Complete Guide"**
   - Angular University
   - Duración: 60 min

2. **"Lazy Loading Deep Dive"**
   - Fireship
   - Duración: 10 min

3. **"Route Guards Tutorial"**
   - Angular University
   - Duración: 30 min

---

## Herramientas

### Análisis de Bundle

| Herramienta | Propósito |
|-------------|-----------|
| **Webpack Bundle Analyzer** | Visualizar bundle |
| **Source Map Explorer** | Analizar source maps |
| **Chrome DevTools** | Network analysis |
| **Lighthouse** | Performance metrics |

### Comandos Útiles

```bash
# Analizar bundle
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/browser/stats.json

# Ver chunks generados
ls -la dist/browser/

# Medir tiempo de carga
# Usar Lighthouse en Chrome DevTools
```

---

## Proyectos de Referencia

### Open Source

1. **Angular RealWorld Example App**
   - Routing completo con guards
   - https://github.com/gothinkster/angular-realworld-example-app

2. **Angular Material**
   - Routing en componentes
   - https://github.com/angular/components

3. **Nx Angular Starter**
   - Routing enterprise
   - https://github.com/nrwl/nx

---

## Glosario de Términos

| Término | Definición |
|---------|------------|
| **Router** | Servicio de navegación de Angular |
| **Route** | Configuración de una URL |
| **RouterOutlet** | Placeholder para componentes |
| **RouterLink** | Directiva de navegación |
| **ActivatedRoute** | Info de la ruta actual |
| **Lazy Loading** | Carga bajo demanda |
| **Chunk** | Archivo JS generado por code splitting |
| **Guard** | Función que controla navegación |
| **Resolver** | Función que precarga datos |
| **Preloading** | Carga anticipada de módulos |

---

## Patrones de Routing

### Estructura Básica

```typescript
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];
```

### Lazy Loading

```typescript
export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard.routes').then(m => m.routes)
  }
];
```

### Con Guards

```typescript
export const routes: Routes = [
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./admin.routes').then(m => m.routes)
  }
];
```

### Con Resolver

```typescript
export const routes: Routes = [
  {
    path: 'user/:id',
    resolve: { user: userResolver },
    component: UserDetailComponent
  }
];
```

---

## Próximos Pasos

Después de completar el Día 3, se recomienda:

1. **Practicar**: Crear features con lazy loading
2. **Implementar**: Guards para autenticación
3. **Medir**: Usar DevTools para ver chunks
4. **Leer**: Documentación oficial de Router

---

*Recursos - Día 3: Lazy Loading y Rutas*
*Curso: Angular 21 Enterprise*
*Día: 3 de 18*
