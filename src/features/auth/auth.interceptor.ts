import { HttpEvent, HttpEventType, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { MessageService } from '../../classes/message.service';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const messageService: MessageService = inject(MessageService);
  const authService: AuthService = inject(AuthService);

  const token: string | null = authService.getAccessToken();

  if(!token){
    return next(req);
  }

  let authReq: HttpRequest<unknown>  = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    tap((event: HttpEvent<unknown>) => {
      if (event.type === HttpEventType.Response) {
        if (event.status === 401) {
          messageService.showError('Ошибка');
        }
      }
    }),
  );

};
