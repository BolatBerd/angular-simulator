import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('../home/home.component').then(m => m.HomeComponent) },
  { path: 'user',
    loadComponent: () => import("../users-page/users-page.component").then(m => m.UsersPageComponent) },
  { path: '**',
    loadComponent: () => import('../not-found/not-found.component').then(m => m.NotFoundComponent) }
];
