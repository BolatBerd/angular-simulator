import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { IPost } from '../IPost';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { MessageService } from '../../../classes/message.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-post-detail',
  imports: [    CommonModule,
    TableModule,
    SkeletonModule,
    ContextMenuModule,
    PaginatorModule,
    ButtonModule],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private messageService: MessageService = inject(MessageService);

  post?: IPost;
  isLoading = true;

  ngOnInit() {
    this.route.data
      .pipe(
        tap({
          next: (data) => {
            this.post = data['post'];
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
            this.post = undefined;
            this.messageService.showError('Ошибка загрузки')
          }
        }),
        takeUntilDestroyed(this.destroyRef))
        .subscribe();
  }

  goBack(): void {
    this.router.navigate(['/posts']);
  }

}

