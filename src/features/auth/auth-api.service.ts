import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private router: Router = inject(Router);

  private refreshTokenUrl: string = 'https://dummyjson.com/auth/refresh';
  private apiLoginUrl: string = 'https://dummyjson.com/auth/login';

  login() {
    return this.apiLoginUrl;
  }

  refreshToken() {
    return this.refreshTokenUrl;
  }

  navigateAuth() {
    return this.router.navigate(['/auth']);
  }
}
