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
          case HttpStatusDescription.UNAUTHORIZED:
            messageService.showError("Доступ не разрешён. Пожалуйста, авторизуйтесь.");
            console.log(req.url, event.status);
            break;
          case HttpStatusDescription.FORBIDDEN:
            messageService.showError("Доступ запрещён. У вас нет прав.");
            console.log(req.url, event.status);
            break;
          case HttpStatusDescription.NOT_FOUND:
            messageService.showError("Ресурс не найден. Проверьте адрес.");
            console.log(req.url, event.status);
            break;
          case HttpStatusDescription.SERVER_ERROR:
            messageService.showError("Внутренняя ошибка сервера. Попробуйте позже.");
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
