import { Routes } from '@angular/router';
import { AlertsComponent } from './pages/alerts/alerts.component';
import { AvatarElementComponent } from './pages/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/badges/badges.component';
import { ButtonsComponent } from './pages/buttons/buttons.component';
import { ImagesComponent } from './pages/images/images.component';
import { VideosComponent } from './pages/videos/videos.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'alerts',
    pathMatch: 'full'
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    data: { title: 'Alertas' }
  },
  {
    path: 'avatars',
    component: AvatarElementComponent,
    data: { title: 'Avatares' }
  },
  {
    path: 'badge',
    component: BadgesComponent,
    data: { title: 'Etiquetas' }
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
    data: { title: 'Botones' }
  },
  {
    path: 'images',
    component: ImagesComponent,
    data: { title: 'Imágenes' }
  },
  {
    path: 'videos',
    component: VideosComponent,
    data: { title: 'Videos' }
  }
];
