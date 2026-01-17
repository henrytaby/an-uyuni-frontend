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
    data: { title: 'Alerts' }
  },
  {
    path: 'avatars',
    component: AvatarElementComponent,
    data: { title: 'Avatars' }
  },
  {
    path: 'badge',
    component: BadgesComponent,
    data: { title: 'Badges' }
  },
  {
    path: 'buttons',
    component: ButtonsComponent,
    data: { title: 'Buttons' }
  },
  {
    path: 'images',
    component: ImagesComponent,
    data: { title: 'Images' }
  },
  {
    path: 'videos',
    component: VideosComponent,
    data: { title: 'Videos' }
  }
];
