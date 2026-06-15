import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {

  private refreshTokenUrl: string = 'https://dummyjson.com/auth/refresh';
  private apiLoginUrl: string = 'https://dummyjson.com/auth/login';

  login(): string {
    return this.apiLoginUrl;
  }

  refreshToken(): string {
    return this.refreshTokenUrl;
  }

}
