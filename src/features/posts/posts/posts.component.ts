import { Component, inject, OnInit } from '@angular/core';
import { IPost } from '../IPost';
import { PostApiService } from '../post-api.service';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { Router } from '@angular/router';
import { ContextMenuModule } from 'primeng/contextmenu';
import { LoaderService } from '../../../classes/loader.service';
import { finalize, Observable, tap } from 'rxjs';
import { IPostsResponse } from '../IPostResponse';
import { PaginatorModule } from 'primeng/paginator';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component'

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
  posts: IPost[] = [];
  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
  menuVisible = false;
  isDialogOpen = false;
  selectedPost?: IPost;
  currentPage = 1;
  pageSize = 10;
  totalPosts = 0;

  menuItems: MenuItem[] = [
    { label: 'Просмотр', command: () => this.onViewPost() },
    { label: 'Редактировать', command: () => this.onEditPost() },
    { label: 'Удалить', command: () => this.onDeletePost() }
  ];

  ngOnInit(): void {
    this.loaderService.showLoader();
    this.postApiService.getPosts(this.currentPage, this.pageSize)
      .pipe(
        tap((response: IPostsResponse) => {
          this.posts = response.posts;
          this.totalPosts = response.total;
        }),
        finalize(() => this.loaderService.hideLoader()))
        .subscribe()
  }

  onRowDblClick(post: IPost): void {
    if (post.id != null) {
      this.router.navigate(['/posts', post.id]);
    }
  }

  onContextMenu(post: IPost, event: MouseEvent): void {
    event.preventDefault();
    this.selectedPost = post;
    this.menuVisible = true;
  }

  closeMenu(): void {
    this.menuVisible = false;
    this.selectedPost = undefined;
  }

  onViewPost(): void {
    if (this.selectedPost) {
      this.router.navigate(['/posts', this.selectedPost.id]);
      this.closeMenu();
    }
  }

  onEditPost(): void{
    if (this.selectedPost) {
      this.openEditDialog(this.selectedPost);
      this.closeMenu();
    }
  }

  loadPosts() {
   this.postApiService.getPosts(this.currentPage, this.pageSize)
  .pipe(
    tap((response: IPostsResponse) => {
      this.posts = response.posts;
      this.totalPosts = response.total;
    }),
    finalize(() => this.loaderService.hideLoader())
  )
  .subscribe();
  }

  openEditDialog(post: IPost) {
    this.selectedPost = post;
    this.isDialogOpen = true;
  }

  onSavePost(updatedPost: IPost) {
    if (updatedPost.id != null) {
      this.postApiService.updatePost(updatedPost.id, updatedPost).subscribe(() => {
        this.loadPosts();
        this.isDialogOpen = false;
        this.selectedPost = undefined;
      });
    }
    }


  onDeletePost(): void{
     if (this.selectedPost) {
       this.postApiService.deletePost(this.selectedPost.id).subscribe(() => {
      this.posts = this.posts.filter(p => p.id !== this.selectedPost!.id);
      this.closeMenu();
      });
     }
  }

  onPageChange(event: any): void {
    this.currentPage = event.page + 1;
    this.pageSize = event.rows;
    this.loaderService.showLoader();
    this.postApiService.getPosts(this.currentPage, this.pageSize)
      .pipe(
        tap((response) => (this.posts = response.posts)),
        finalize(() => this.loaderService.hideLoader())
      )
      .subscribe();
  }

  onCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

}
