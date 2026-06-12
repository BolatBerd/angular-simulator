import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../classes/message.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  private messageService: MessageService = inject(MessageService);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private fb: FormBuilder = inject(FormBuilder);

  authForm: FormGroup = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    if(this.authForm.valid) {
      this.authService
        .login(this.authForm.value.login, this.authForm.value.password)
          .pipe(
            tap(() => {
              this.router.navigate(['/posts']);
              this.messageService.showSuccess('успешно авторизовался');
            }),
            catchError((error: HttpErrorResponse) => {
              this.messageService.showError('Ошибка при авторизции');
              return throwError(() => error);
            })
          ).subscribe();
    }
  }

    // onLoginSuccess(){
    //   this.router.navigate(['/posts']);
    //   this.messageService.showSuccess('успешно авторизовался');
    // }
    // if (this.postForm.valid) {

    //   const tagsArray: string[] = this.postForm.value.tags
    //     .split(',')
    //     .map((tag: string) => tag.trim())
    //     .filter((tag: string) => tag.length > 0);

    //   const newPost: IPost = {
    //     id: 0,
    //     title: this.postForm.value.title,
    //     body: this.postForm.value.body,
    //     tags: tagsArray,
    //     views: this.postForm.value.views,
    //     userId: 1,
    //     reactions: { likes: 0, dislikes: 0 }
    //   };

    //   this.postApiService.createPost(newPost)
    //     .pipe(
    //       tap((newPost: IPost) => {
    //           this.router.navigate(['/posts']);
    //           this.messageService.showSuccess('Пост успешно создан');
    //         }),
    //         catchError((error: HttpErrorResponse) => {
    //           this.messageService.showError('Ошибка при создании поста');
    //           return throwError(() => error);
    //         })
    //       ).subscribe();
    // }



   onCancel(): void {
    this.router.navigate(['/posts']);
  }

}
