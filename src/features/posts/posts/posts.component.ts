import { Component, inject, OnInit } from '@angular/core';
import { PostEditDialogComponent } from '../post-edit-dialog/post-edit-dialog.component'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { IPageChangeEvent } from '../IPageChangeEvent';
import { PostStateService } from '../post-store.service';
import { Observable, tap } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { IPostsResponse } from '../IPostResponse';
import { SkeletonModule } from 'primeng/skeleton';
import { MessageService } from '../../../classes/message.service';
import { LoaderService } from '../../../classes/loader.service';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { IPost } from '../IPost';

@Component({
  selector: 'app-posts',
  imports: [
    CommonModule,
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    PaginatorModule,
    ButtonModule,

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

  isLoading$: Observable<boolean> = this.loaderService.isLoading$;
  posts$: Observable<IPost[]> = this.postStateService.posts$;

  isDialogOpen: boolean = false;
  selectedPost?: IPost;

  currentPage: number = 1;
  totalPosts: number = 0;
  pageSize: number = 10;

  ref: DynamicDialogRef | undefined | null;

  menuItems: MenuItem[] = [
    { label: 'Просмотр', command: () => this.onViewPost() },
    { label: 'Редактировать', command: () => this.onEditPost() },
    { label: 'Удалить', command: () => this.onDeletePost() }
  ];

  ngOnInit(): void {
    this.loadPosts()
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
      this.ref = this.dialogService.open(PostEditDialogComponent, {
        header: 'Редактировать пост',
        width: '600px',
        modal: true,
        data: this.selectedPost,
        closable: true,
        baseZIndex: 10000
      });
      this.ref?.onClose
      .pipe(
        tap((updatedPost: IPost | undefined) => {
          if (updatedPost) {
            this.onSavePost(updatedPost);
          }
        })
      ).subscribe()
    }
  }

  openEditDialog(post: IPost): void {
    this.selectedPost = post;
    this.isDialogOpen = true;
  }

  onSavePost(updatedPost: IPost): void {
    if (updatedPost.id != null) {
      this.postStateService.updatePost(updatedPost.id, updatedPost)
      .pipe(
        tap(() => this.messageService.showSuccess('Пост успешно обновлен')),
      ).subscribe();
    }
  }

  onDeletePost(): void{
    if (this.selectedPost) {
      this.postStateService.deletePost(this.selectedPost.id)
      .pipe(
        tap(() => this.messageService.showSuccess('Пост успешно удален'))
      ).subscribe();
    }
  }

  onPageChange(event: IPageChangeEvent): void {
    const rows: number = event.rows ?? this.pageSize;
    const page: number = event.page ?? 0;

    this.currentPage = page + 1;
    this.pageSize = rows;

    this.loadPosts();
  }

  onCreatePost(): void {
    this.router.navigate(['/posts/create']);
  }

}
