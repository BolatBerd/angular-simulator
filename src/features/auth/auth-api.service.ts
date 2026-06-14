import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private router: Router = inject(Router);

  private refreshTokenUrl: string = 'https://dummyjson.com/auth/refresh';
  private apiLoginUrl: string = 'https://dummyjson.com/auth/login';

  login(): string {
    return this.apiLoginUrl;
  }

  refreshToken(): string {
    return this.refreshTokenUrl;
  }

  navigateAuth(): Promise<boolean> {
    return this.router.navigate(['/auth']);
  }

}
