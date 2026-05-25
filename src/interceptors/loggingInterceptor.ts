import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { HttpStatusDescription } from "../enums/HttpStatusDescription";

function getStatusMessage(status: number): string {
  switch (status) {
    case 200:
      return HttpStatusDescription.SUCCESS;

    case 401:
      return HttpStatusDescription.UNAUTHORIZED;

    case 403:
      return HttpStatusDescription.FORBIDDEN;

    case 404:
      return HttpStatusDescription.NOT_FOUND;

    case 500:
      return HttpStatusDescription.SERVER_ERROR;

    default:
      return 'Неизвестный статус';
  }
}

export function loggingInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const started = Date.now();
  return next(req).pipe(
    tap((event) => {
      const ended = Date.now();
      if (event.type === HttpEventType.Response) {
        console.log(req.method, req.url, 'Вернул ответ со статусом', getStatusMessage(event.status), 'за', ended - started, 'мс');
      }
    }),
  );
}
