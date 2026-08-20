import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { PostApiService } from '../services/post-api.service';
import { MessageService } from '../../../core/services/message.service';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { IPost } from '../interfaces/IPost';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule, ButtonModule, TranslatePipe, CommonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: ['', Validators.required],
    views: [0, [Validators.required, Validators.min(0)]],
  });

   onSubmit(): void {
    if (this.postForm.valid) {

      const tagsArray: string[] = this.postForm.value.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      const newPost: IPost = {
        id: 0,
        title: this.postForm.value.title,
        body: this.postForm.value.body,
        tags: tagsArray,
        views: this.postForm.value.views,
        userId: 1,
        reactions: { likes: 0, dislikes: 0 }
      };

      this.postApiService.createPost(newPost)
        .pipe(
          tap((newPost: IPost) => {
              this.router.navigate(['/posts']);
              this.messageService.showSuccess('Пост успешно создан');
            }),
            catchError((error: HttpErrorResponse) => {
              this.messageService.showError('Ошибка при создании поста');
              return throwError(() => error);
            })
          ).subscribe();
    }
  }

   onCancel(): void {
    this.router.navigate(['/posts']);
  }

}
