import { HttpInterceptorFn, HttpErrorResponse, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { MessageService } from '../../classes/message.service';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const messageService: MessageService = inject(MessageService);
  const authService: AuthService = inject(AuthService);

  const token: string | undefined = authService.getAccessToken();

  let authReq: HttpRequest<unknown> = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${ token }`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap(() => {
            const newToken: string | undefined = authService.getAccessToken();
            const retryReq: HttpRequest<unknown> = req.clone({
              setHeaders: {
                Authorization: `Bearer ${ newToken }`
              }
            });
            return next(retryReq);
          }),
          catchError((error: HttpErrorResponse) => {
            authService.logout();
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
