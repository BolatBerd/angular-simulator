import { Component, inject } from '@angular/core';
import { PostApiService } from '../post-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IPost } from '../IPost';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './post-create.component.html',
  styleUrl: './post-create.component.scss',
})
export class PostCreateComponent {

  private postApiService: PostApiService = inject(PostApiService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  postForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    tags: ['', Validators.required],
    views: [0, [Validators.required, Validators.min(0)]],
  });

   onSubmit(): void {
    if (this.postForm.valid) {
      const formValue = this.postForm.value;

      const tagsArray = formValue.tags
        .split(',')
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag.length > 0);

      const newPost: IPost = {
        id: 0,
        title: formValue.title,
        body: formValue.body,
        tags: tagsArray,
        views: formValue.views,
        userId: 1,
        reactions: { likes: 0, dislikes: 0 }
      };

      this.postApiService.createPost(newPost).subscribe({
        next: () => {
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          console.error('Ошибка при создании поста:', err);
        }
      });
    }
  }

   onCancel(): void {
    this.router.navigate(['/posts']);
  }

}
