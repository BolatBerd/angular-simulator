import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { IPost } from '../IPost';
import { PostApiService } from '../post-api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { LoaderService } from '../../../classes/loader.service';
import { Observable, tap } from 'rxjs';
import { IPostsResponse } from '../IPostResponse';
import { PaginatorModule } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IPageChangeEvent } from '../IPageChangeEvent';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    PaginatorModule,
    ButtonModule,
    PostEditDialogComponent
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private postApiService: PostApiService = inject(PostApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private router: Router = inject(Router);
  private destroyRef = inject(DestroyRef);

  posts$: Observable<IPost[]> = this.postApiService.post$;
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;

  isDialogOpen: boolean = false;
  selectedPost?: IPost;

  currentPage: number = 1;
  pageSize: number = 10;
  totalPosts: number = 0;

  menuItems: MenuItem[] = [
    { label: 'Просмотр', command: () => this.onViewPost() },
    { label: 'Редактировать', command: () => this.onEditPost() },
    { label: 'Удалить', command: () => this.onDeletePost() }
  ];

  ngOnInit(): void {
    this.loadPosts()
  }

  loadPosts(): void {
    this.postApiService.getPosts(this.currentPage, this.pageSize)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((response: IPostsResponse) => {
          this.totalPosts = response.total;
        })
      )
      .subscribe();
  }

  onRowDblClick(post: IPost): void {
    if (post.id != null) {
      this.router.navigate(['/posts', post.id]);
    }
  }

  onViewPost(): void {
    if (this.selectedPost) {
      this.router.navigate(['/posts', this.selectedPost.id]);
    }
  }

  onEditPost(): void{
    if (this.selectedPost) {
      this.isDialogOpen = true;
    }
  }

  openEditDialog(post: IPost): void {
    this.selectedPost = post;
    this.isDialogOpen = true;
  }

  onSavePost(updatedPost: IPost): void {
    if (updatedPost.id != null) {
      this.postApiService.updatePost(updatedPost.id, updatedPost)
      .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.closeDialog();
        });
    }
  }

  onDeletePost(): void{
    if (this.selectedPost) {
      this.postApiService.deletePost(this.selectedPost.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => {
          this.closeDialog();
        });
    }
  }

  onPageChange(event: IPageChangeEvent): void {
    const page: number = event.page ?? 0;
    const rows: number = event.rows ?? this.pageSize;

    this.currentPage = page + 1;
    this.pageSize = rows;

    this.loadPosts();
  }

  onCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

  closeDialog(): void {
    this.isDialogOpen = false;
    this.selectedPost = undefined;
  }

}
