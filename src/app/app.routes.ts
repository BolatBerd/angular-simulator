import { authGuard } from '../features/auth/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'posts',
    canActivate:[authGuard],
    loadChildren: () => import('../features/posts/posts-routing.module').then(m => m.postRoutes)
  },
  {
    path: 'auth',
    loadChildren: () => import('../features/auth/auth-routing.module').then(m => m.authRoutes)
  },
  {
    path: '',
    loadComponent: () => import('../home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'user',
    loadComponent: () => import('../users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  {
    path: '**',
    loadComponent: () =>import('../not-found/not-found.component').then(m => m.NotFoundComponent)
  },
];
