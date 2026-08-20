import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Component, inject, OnInit } from '@angular/core';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PostStateService } from '../services/post-store.service';
import { Observable, tap } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { IPostsResponse } from '../interfaces/IPostResponse';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from '../../../core/services/message.service';
import { LoaderService } from '../../../core/services/loader.service';
import { LazyLoadEvent } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { IPost } from '../interfaces/IPost';

@Component({
  selector: 'app-posts',
  imports: [
    ContextMenuModule,
    PaginatorModule,
    SkeletonModule,
    CommonModule,
    ButtonModule,
    TableModule,
    TranslatePipe,
  ],
   providers: [DialogService],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {

  private postStateService: PostStateService = inject(PostStateService);
  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private dialogService: DialogService = inject(DialogService);
  private router: Router = inject(Router);
  private translateService: TranslateService = inject(TranslateService);

  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
  posts$: Observable<IPost[]> = this.postStateService.posts$;

  selectedPost?: IPost;

  currentPage: number = 1;
  totalPosts: number = 0;
  pageSize: number = 10;

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.loadPosts();
    this.updateMenuItems();
    this.translateService.onLangChange.subscribe(() => this.updateMenuItems());
  }

  private updateMenuItems(): void {
    this.menuItems = [
      { label: this.translateService.instant('POSTS.VIEW'), command: () => this.onViewPost() },
      { label: this.translateService.instant('POSTS.EDIT'), command: () => this.onEditPost() },
      { label: this.translateService.instant('POSTS.DELETE'), command: () => this.onDeletePost() },
    ];
  }

  loadPosts(): void {
    this.postStateService.loadPosts(this.currentPage, this.pageSize)
      .pipe(
        tap((response: IPostsResponse) => this.totalPosts = response.total)
      ).subscribe();
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
      const dialogRef: DynamicDialogRef<PostEditDialogComponent> | null = this.dialogService
      .open(PostEditDialogComponent, {
        header: this.translateService.instant('POSTS.EDIT_HEADER'),
        width: '600px',
        modal: true,
        data: this.selectedPost,
        closable: true,
        baseZIndex: 10000
      });
      dialogRef?.onClose
      .pipe(
        tap((updatedPost: IPost | undefined) => {
          if (updatedPost) {
            this.onSavePost(updatedPost);
          }
        })
      ).subscribe();
    }
  }

  openEditDialog(post: IPost): void {
    this.selectedPost = post;
  }

  onSavePost(updatedPost: IPost): void {
    if (updatedPost.id != null) {
      this.postStateService.updatePost(updatedPost.id, updatedPost)
      .pipe(
        tap(() => this.messageService.showSuccess('Пост успешно обновлен')),
      ).subscribe();
    }
  }

  onDeletePost(): void {
    if (this.selectedPost) {
      this.postStateService.deletePost(this.selectedPost.id)
      .pipe(
        tap(() => this.messageService.showSuccess('Пост успешно удален'))
      ).subscribe();
    }
  }

  onPageChange(event: LazyLoadEvent): void {
    const rows: number = event.rows ?? this.pageSize;
    const page: number = event.first ? (event.first / rows) + 1 : this.currentPage;

    this.currentPage = page;
    this.pageSize = rows;

    this.loadPosts();
  }

  redirectToCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

}
