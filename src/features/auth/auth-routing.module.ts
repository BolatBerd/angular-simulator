import { Routes } from '@angular/router';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./auth/auth.component').then(m => m.AuthComponent)
  },

];
