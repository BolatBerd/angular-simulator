import { productResolver } from './features/products/product.resolver'
import { adminGuard } from './features/auth/guards/admin.guard';
import { authGuard } from './features/auth/guards/auth.guard';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => import('./features/auth/auth/auth.component').then(m => m.AuthComponent)
  },
  {
    path: 'posts',
    canActivate: [authGuard, adminGuard],
    loadChildren: () => import('./features/posts/posts-routing.module').then(m => m.postRoutes)
  },
  {
    path: 'user',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./features/users/users-page/users-page.component').then(m => m.UsersPageComponent)
  },
  {
    path: 'parent',
    loadComponent: () => import('./features/homework-28/parent/parent.component').then(m => m.ParentComponent)
  },
  {
    path: 'change-detection-default',
    loadComponent: () => import('./features/homework-28/change-detection-default/change-detection-default.component').then(m => m.ChangeDetectionDefaultComponent)
  },
  {
    path: 'change-detection-on-push',
    loadComponent: () => import('./features/homework-28/change-detection-on-push/change-detection-on-push.component').then(m => m.ChangeDetectionOnPushComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/products/cart/cart.component').then(m => m.CartComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent),
    resolve: {
      product: productResolver
    }
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent)
  },
];
