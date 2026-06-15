import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async () => {
  const authService: AuthService = inject(AuthService);
  const date: Date = new Date;
  const expirationDate: Date = await firstValueFrom(authService.expiresInMins$);
  if (authService.isLoggedIn() && date < expirationDate) {
    return true;
  } else {
    authService.refreshToken();
      if (authService.isLoggedIn() && date < expirationDate) {
        return true;
      } else {
        authService.logout();
        return false;
      }
  }
};
