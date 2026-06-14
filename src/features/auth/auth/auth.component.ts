import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, tap, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../../../classes/message.service';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, CommonModule],
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
              // this.messageService.showError('Ошибка при авторизции');
              return throwError(() => error);
            })
          ).subscribe();
    }
  }

   onCancel(): void {
    this.router.navigate(['/posts']);
  }

}
