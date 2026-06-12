import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const authService: AuthService = inject(AuthService)
  if(authService.isLoggedIn() === true){
    return true;
  } else {
    authService.logout();
    return false;
  }
};
