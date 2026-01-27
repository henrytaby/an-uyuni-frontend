import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef, inject, OnInit, OnDestroy, AfterViewInit, signal, computed } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { filter, Subscription } from 'rxjs';

interface NavItem {
  name: string;
  icon: string;
  path?: string;
  new?: boolean;
  subItems?: { name: string; path: string; icon?: string; pro?: boolean; new?: boolean }[];
}

@Component({
  selector: 'app-sidebar',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './app-sidebar.component.html',
})
export class AppSidebarComponent implements OnInit, OnDestroy, AfterViewInit {

  public sidebarService = inject(SidebarService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  currentMenu = this.authService.currentMenu;

  // Compute navItems from the currentMenu signal
  navItems = computed<NavItem[]>(() => {
    const rawMenu = this.currentMenu();
    
    // Static Home Item
    const homeItem: NavItem = {
      name: 'Inicio',
      icon: 'pi pi-th-large',
      path: '/'
    };

    const dynamicItems = rawMenu.map(group => {
      // Create a navigation item for the Group (Parent)
      // This will be collapsible if it has subItems (modules)
      const groupItem: NavItem = {
        name: group.group_name,
        icon: group.icon,
        // Assuming groups don't have a direct route, if they act as collapse triggers
        // path: `/${group.slug}`, 
        subItems: group.modules.map(module => ({
          name: module.name,
          path: `/${module.route}`, // Assuming route is relative
          icon: module.icon
        }))
      };
      return groupItem;
    });

    return [homeItem, ...dynamicItems];
  });

  // For now, keep others empty or remove it.
  othersItems: NavItem[] = [];

  openSubmenu = signal<string | null>(null);
  subMenuHeights = signal<Record<string, number>>({});

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
      { items: this.navItems(), prefix: 'main' },
      { items: this.othersItems, prefix: 'others' },
    ];

    let foundMatch = false;

    menuGroups.forEach(group => {
      group.items.forEach((nav, i) => {
        // Check if root item matches
        if (nav.path && currentUrl === nav.path) {
           this.openSubmenu.set(null); // Close any open submenu
           foundMatch = true;
        }

        if (nav.subItems) {
          nav.subItems.forEach(subItem => {
            if (currentUrl === subItem.path) {
              const key = `${group.prefix}-${i}`;
              this.openSubmenu.set(key);
              foundMatch = true;

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

    // If no navigation item matches the current URL (e.g. /profile), 
    // we should probably close opened submenus to avoid confusion, 
    // unless we want to keep the last state. 
    // Given the user report, clearing it seems appropriate if it's an unrelated page.
    // However, sometimes we might want to keep it open if it's a child page not in menu?
    // For now, let's only clear if we explicitly found a match on a root item (handled above),
    // OR if we strictly want to ensure "Configuración" isn't active when at /profile.
    
    // If /profile is NOT in the menu, then 'foundMatch' is false.
    // The previous state remains.
    // To fix "Configuración" being active/expanded when at /profile:
    if (!foundMatch) {
       this.openSubmenu.set(null);
    }
  }

  onSubmenuClick() {
    if (this.isMobileOpen()) {
      this.sidebarService.setMobileOpen(false);
    }
  }  
}
