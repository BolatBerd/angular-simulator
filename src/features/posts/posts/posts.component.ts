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
  menuVisible = false;
  menuX = 0;
  menuY = 0;
  selectedPost?: IPost;

  ngOnInit(): void {
    this.postApiService.getPosts().subscribe((response: any) => {
      console.log(response.posts);
      this.posts = response.posts;
      this.loading = false;

    });
  }

  onRowDblClick(event: any) {
    const post: IPost | undefined = event?.data;
    if (post && post.id != null) {
      this.router.navigate(['/posts', post.id]);
    }
  }

  onContextMenu(post: IPost, event: MouseEvent) {
    event.preventDefault();
    this.selectedPost = post;
    this.menuX = event.clientX;
    this.menuY = event.clientY;
    this.menuVisible = true;
  }

  closeMenu() {
    this.menuVisible = false;
    this.selectedPost = undefined;
  }

  onViewPost() {
    if (this.selectedPost) {
      this.router.navigate(['/posts', this.selectedPost.id]);
      this.closeMenu();
    }
  }

  onEditPost(){
    if (this.selectedPost) {
          // Открываем модалку с этим постом (например, с помощью диалога PrimeNG)
    // this.postEditDialogComponent.open(this.selectedPost);
    // this.closeMenu();
    }
  }

  onDeletePost(){
     if (this.selectedPost) {
       this.postApiService.deletePost(this.selectedPost.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== this.selectedPost!.id);
      this.closeMenu();
      });
     }
  }
}
