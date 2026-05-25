import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('../home/home.component').then(h => h.HomeComponent) },
  { path: 'user',
    loadComponent: () => import("../users-page/users-page.component").then(u => u.UsersPageComponent) },
  { path: '**',
    loadComponent: () => import('../not-found/not-found.component').then(f => f.NotFoundComponent) }
];
