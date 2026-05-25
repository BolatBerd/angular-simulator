import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { HttpStatusDescription } from "../enums/HttpStatusDescription";

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        switch (event.status) {
          case 401:
            alert(HttpStatusDescription.UNAUTHORIZED);
            console.log(req.url, event.status);
            break;
          case 403:
            alert(HttpStatusDescription.FORBIDDEN);
            console.log(req.url, event.status);
            break;
          case 404:
            alert(HttpStatusDescription.NOT_FOUND);
            console.log(req.url, event.status);
            break;
          case 500:
            alert(HttpStatusDescription.SERVER_ERROR);
            console.log(req.url, event.status);
            break;
          default:
            alert('Неизвестная ошибка');
            console.log(req.url, event.status);
        }
      }
    }),
  );
}
