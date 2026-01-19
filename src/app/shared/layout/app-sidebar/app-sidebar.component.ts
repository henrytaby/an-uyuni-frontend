import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject, OnInit, OnDestroy, AfterViewInit, signal, computed } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SidebarWidgetComponent } from './app-sidebar-widget.component';
import { filter, Subscription } from 'rxjs';

interface NavItem {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule,
    SidebarWidgetComponent
  ],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  // Main nav items
  navItems: NavItem[] = [
    {
      icon: 'pi pi-th-large',
      name: "Dashboard",
      subItems: [
        { name: "Ecommerce", path: "/" },
      ],
    },
    {
      icon: 'pi pi-calendar',
      name: "Calendario",
      path: "/calendar",
    },
    {
      icon: 'pi pi-user',
      name: "Perfil de Usuario",
      path: "/profile",
    },
    {
      name: "Formularios",
      icon: 'pi pi-list',
      subItems: [
        { name: "Elementos de Formulario", path: "/forms", pro: false }
      ],
    },
    {
      name: "Tablas",
      icon: 'pi pi-table',
      subItems: [
        { name: "Vista General", path: "/tables/overview", pro: false },
        { name: "Factura", path: "/invoice", pro: false },
      ],
    },
    {
      name: "Páginas",
      icon: 'pi pi-file',
      subItems: [
        { name: "Página en Blanco", path: "/blank", pro: false },
        { name: "Error 404", path: "/error-404", pro: false },
      ],
    },
  ];

  // Others nav items
  othersItems: NavItem[] = [
    {
      icon: 'pi pi-chart-pie',
      name: "Gráficos",
      subItems: [
        { name: "Gráfico de Líneas", path: "/charts/line-chart", pro: false },
        { name: "Gráfico de Barras", path: "/charts/bar-chart", pro: false },
      ],
    },
    {
      icon: 'pi pi-box',
      name: "Elementos UI",
      subItems: [
        { name: "Alertas", path: "/ui/alerts", pro: false },
        { name: "Avatar", path: "/ui/avatars", pro: false },
        { name: "Etiquetas", path: "/ui/badge", pro: false },
        { name: "Botones", path: "/ui/buttons", pro: false },
        { name: "Imágenes", path: "/ui/images", pro: false },
        { name: "Videos", path: "/ui/videos", pro: false },
      ],
    },
    {
      icon: 'pi pi-lock',
      name: "Autenticación",
      subItems: [
        { name: "Iniciar Sesión", path: "/signin", pro: false },
        { name: "Registrarse", path: "/signup", pro: false },
      ],
    },
  ];

  openSubmenu = signal<string | null>(null);
  subMenuHeights = signal<Record<string, number>>({});

  public sidebarService = inject(SidebarService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  readonly isExpanded = this.sidebarService.isExpanded;
  readonly isMobileOpen = this.sidebarService.isMobileOpen;
  readonly isHovered = this.sidebarService.isHovered;

  // Computed for consolidated view state
  readonly isVisible = computed(() => this.isExpanded() || this.isHovered() || this.isMobileOpen());

  private routeSubscription?: Subscription;

  ngOnInit() {
    this.routeSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setActiveMenuFromRoute(this.router.url);
    });
  }
  
  ngAfterViewInit() {
    setTimeout(() => {
      this.setActiveMenuFromRoute(this.router.url);
    });
  }

  ngOnDestroy() {
    this.routeSubscription?.unsubscribe();
  }

  isActive(path: string): boolean {
    return this.router.url === path;
  }

  toggleSubmenu(section: string, index: number) {
    const key = `${section}-${index}`;

    if (this.openSubmenu() === key) {
      this.openSubmenu.set(null);
      this.subMenuHeights.update(heights => ({ ...heights, [key]: 0 }));
    } else {
      this.openSubmenu.set(key);

      setTimeout(() => {
        if (typeof document !== 'undefined') {
          const el = document.getElementById(key);
          if (el) {
            this.subMenuHeights.update(heights => ({ ...heights, [key]: el.scrollHeight }));
          }
        }
      });
    }
  }

  onSidebarMouseEnter() {
    if (!this.isExpanded()) {
      this.sidebarService.setHovered(true);
    }
  }

  private setActiveMenuFromRoute(currentUrl: string) {
    const menuGroups = [
      { items: this.navItems, prefix: 'main' },
      { items: this.othersItems, prefix: 'others' },
    ];

    menuGroups.forEach(group => {
      group.items.forEach((nav, i) => {
        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (currentUrl === subItem.path) {
              const key = `${group.prefix}-${i}`;
              this.openSubmenu.set(key);

              setTimeout(() => {
                if (typeof document !== 'undefined') {
                  const el = document.getElementById(key);
                  if (el) {
                    this.subMenuHeights.update(heights => ({ ...heights, [key]: el.scrollHeight }));
                  }
                }
              });
            }
          });
        }
      });
    });
  }

  onSubmenuClick() {
    if (this.isMobileOpen()) {
      this.sidebarService.setMobileOpen(false);
    }
  }  
}
