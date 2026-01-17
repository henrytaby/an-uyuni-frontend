# Uyuni Frontend (Angular Enterprise)

![Angular Version](https://img.shields.io/badge/Angular-v21+-dd0031.svg)
![TailwindCSS Version](https://img.shields.io/badge/TailwindCSS-v4--beta-38bdf8.svg)
![Architecture](https://img.shields.io/badge/Architecture-DDD%20Lite-blue)
![License](https://img.shields.io/badge/License-MIT-green)

Bienvenido a **Uyuni Frontend**, una aplicación empresarial moderna construida con **Angular v21** y **TailwindCSS**, siguiendo una arquitectura escalable basada en **Domain-Driven Design (DDD)** y **Modular Monolith**.

---

## 🚀 Características Principales

-   **Arquitectura Enterprise**: Estructura sólida dividida en `Core`, `Shared` y `Features`.
-   **Lazy Loading**: Carga perezosa implementada en todos los módulos de funcionalidad.
-   **Angular Signals**: Gestión de estado reactivo moderna y performante.
-   **TailwindCSS v4**: Estilizado utilitario de próxima generación para un desarrollo UI ultra rápido.
-   **Standalone Components**: Adopción total del paradigma moderno de Angular (sin `NgModules` innecesarios).
-   **Rendimiento**: Optimizado para Core Web Vitals.

---

## 🛠️ Requisitos Previos

Asegúrate de tener instalado:

-   **Node.js**: v18.13.0 o superior (Recomendado v20+).
-   **NPM**: v9+ o **Yarn** / **PNPM**.
-   **Angular CLI**: v21 (`npm install -g @angular/cli`).

---

## 📦 Instalación y Uso

1.  **Clonar el repositorio**:
    ```bash
    git clone https://gitlab.com/tu-empresa/uyuni-frontend.git
    cd uyuni-frontend
    ```

2.  **Instalar dependencias**:
    ```bash
    npm install
    ```

3.  **Correr en desarrollo**:
    ```bash
    npm start
    # O explícitamente:
    ng serve
    ```
    La aplicación estará disponible en `http://localhost:4200/`.

4.  **Construir para producción**:
    ```bash
    npm run build
    ```
    Los archivos compilados se generarán en `dist/ng-uyuniadmin/`.

---

## 🏛️ Arquitectura del Proyecto

Este proyecto no sigue la estructura plana tradicional de Angular. Utilizamos **DDD Lite** para organizar el código por dominios de negocio.

### Estructura de Carpetas

```
src/app/
├── core/           # 🧠 Singletons (Auth, Config, Guards). Una sola instancia.
├── shared/         # 🛠️ UI Components (Buttons, Modales, Inputs). Reutilizables.
├── features/       # 💼 Módulos de Negocio (Dashboard, Invoice, Users).
│   ├── dashboard/
│   ├── invoice/
│   │   ├── pages/      # Smart Components (Vistas con lógica)
│   │   ├── components/ # Dumb Components (Tablas, Listas específicas)
│   │   ├── models/     # Interfaces de dominio
│   │   ├── services/   # Lógica de negocio HTTP
│   │   └── invoice.routes.ts # 🚦 Micro-ruteo y Lazy Loading específico del módulo
│   └── ...
└── app.routes.ts   # 🚦 Router principal (Lazy Loading)
```

> 📘 **Documentación Detallada**: Para una guía profunda sobre la arquitectura, patrones y cómo crear nuevos módulos, lee la **[Guía de Arquitectura e Inicio](docs/ARCHITECTURE.md)**.

---

## 🎨 Patrones de Diseño

-   **Smart vs Dumb Components**:
    -   **Smart (Pages)**: Gestionan datos, inyectan servicios.
    -   **Dumb (Components)**: Solo reciben `@Input` y emiten `@Output`.
-   **Angular Signals**:
    -   Uso de `signal()`, `computed()` y `effect()` para reactividad fina.
-   **Feature Isolation**:
    -   Un módulo Feature no debe importar componentes privados de otro módulo Feature.

---

## 📚 Documentación Adicional

-   **[ARCHITECTURE.md](docs/ARCHITECTURE.md)**: Guía completa para desarrolladores.
-   **[LAYOUT_GUIDE.md](docs/LAYOUT_GUIDE.md)**: Detalle del sistema de plantillas y layouts.
-   **[Tailwind CSS v4 Docs](https://tailwindcss.com/docs/v4-beta)**: Documentación oficial de la versión instalada.
-   **Angular Style Guide**: Seguimos estrictamente las recomendaciones oficiales.

---

## 🛡️ Calidad de Código

El proyecto incluye herramientas pre-configuradas para asegurar la calidad y consistencia del código:

### 1. Linting (Análisis Estático)
Utilizamos **ESLint** con las reglas oficiales de Angular.
```bash
npm run lint
```

### 2. Testing (Pruebas Unitarias)
Utilizamos **Jest** como motor de pruebas (más rápido que Karma).
```bash
npm test
```

### 3. Strict Mode
TypeScript está configurado en **Modo Estricto** para prevenir errores comunes y asegurar un tipado fuerte.


---

## 🤝 Contribuyendo

1.  Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`).
2.  Desarrolla siguiendo la estructura `src/app/features/<nombre>`.
3.  Asegúrate de que el build pase (`npm run build`).
4.  Abre un Merge Request (MR).

---

&copy; 2026 Uyuni Project. Built with ❤️ utilizing Angular 21.
