import { Component, inject } from '@angular/core';
import { PostCreateComponent } from '../post-create/post-create.component';
import { PostDetailComponent } from '../post-detail/post-detail.component';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { IPost } from '../IPost';
import { PostApiService } from '../post-api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';


@Component({
  selector: 'app-posts',
  imports: [CommonModule, TableModule, SkeletonModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {

  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);
  posts: IPost[] = [];
  loading: boolean = true;

  ngOnInit(): void {
    this.postApiService.getPosts().subscribe((posts: IPost[]) => {
      this.posts = posts;
      this.loading = false;
    });
  }

  onRowDblClick(event: any) {
    const post: IPost | undefined = event?.data ?? event;
    if (post && post.id != null) {
      this.router.navigate(['/posts', post.id]);
    }
  }

  onContextMenu(post: IPost, event: MouseEvent) {
    // Открыть контекстное меню с действиями
    event.preventDefault();
    // Здесь реализуешь логику показа меню
  }

}
