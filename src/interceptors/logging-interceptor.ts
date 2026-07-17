import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { HttpStatusDescription } from '../enums/HttpStatusDescription';
import { Observable, tap } from 'rxjs';
import { APP_CONFIG } from '../config.token';
import { inject } from '@angular/core';
import { AppConfig } from '../interfaces/IAppConfig';

function getStatusMessage(status: number): string {
  switch (status) {
    case HttpStatusDescription.SUCCESS:
      return 'Запрос выполнен успешно';

    case HttpStatusDescription.UNAUTHORIZED:
      return 'Доступ не разрешён. Пожалуйста, авторизуйтесь.';

    case HttpStatusDescription.FORBIDDEN:
      return 'Доступ запрещён. У вас нет прав.';

    case HttpStatusDescription.NOT_FOUND:
      return 'Ресурс не найден. Проверьте адрес.';

    case HttpStatusDescription.SERVER_ERROR:
      return 'Внутренняя ошибка сервера. Попробуйте позже.';

    default:
      return 'Неизвестный статус';
  }
}

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const config: AppConfig = inject(APP_CONFIG);
  const started: number = Date.now();
  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      const ended: number = Date.now();
      if (event.type === HttpEventType.Response && config.enableLogs) {
        console.log(
          req.method,
          req.url,
          'Вернул ответ со статусом',
          getStatusMessage(event.status),
          'за',
          ended - started,
          'мс',
        );
      }
    }),
  );
}
