import { Component, inject } from '@angular/core';
import { IPost } from '../IPost';
import { PostApiService } from '../post-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  imports: [ReactiveFormsModule],
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
      body: ['', Validators.required],
    });

  onSubmit() {
    if (this.postForm.valid) {
      this.postApiService.createPost(this.postForm.value).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }
}
