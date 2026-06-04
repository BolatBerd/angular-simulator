import { Routes } from '@angular/router';
import { postResolver } from './post.resolver';

export const postRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./posts/posts.component').then(m => m.PostsComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./post-create/post-create.component').then(m => m.PostCreateComponent)
  },
  {
    path: ':id',
    resolve: { post: postResolver },
    loadComponent: () => import('./post-detail/post-detail.component').then(m => m.PostDetailComponent)
  },
];

