import { Routes } from '@angular/router';
import { postResolver } from './post.resolver';

export const postRoutes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full'
  },
  {
    path: 'post-create',
    loadComponent: () => import('./post-create/post-create.component').then(m => m.PostCreateComponent)
  },
  {
    path: 'post-detail',
    loadComponent: () => import('./post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
  {
    path: 'posts/:id',
    resolve: { post: postResolver },
    loadComponent: () => import('./posts/posts.component').then(m => m.PostsComponent)
  },
];

