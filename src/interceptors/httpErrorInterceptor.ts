import { HttpEvent, HttpEventType, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { HttpStatusDescription } from "../enums/HttpStatusDescription";
import { MessageService } from '../classes/message.service';
import { inject } from "@angular/core";

export function httpErrorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const messageService: MessageService = inject(MessageService);
  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {

        switch (event.status) {
          case 401:
            messageService.showError(HttpStatusDescription.UNAUTHORIZED);
            console.log(req.url, event.status);
            break;
          case 403:
            messageService.showError(HttpStatusDescription.FORBIDDEN);
            console.log(req.url, event.status);
            break;
          case 404:
            messageService.showError(HttpStatusDescription.NOT_FOUND);
            console.log(req.url, event.status);
            break;
          case 500:
            messageService.showError(HttpStatusDescription.SERVER_ERROR);
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
