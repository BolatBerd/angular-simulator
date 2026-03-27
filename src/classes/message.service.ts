import { Injectable } from "@angular/core";
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messagesSubject = new BehaviorSubject<IMessage[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private addMessage(type: MessageType, text: string): void {
    const message: IMessage = { type, text };

    const current: IMessage[] = this.messagesSubject.getValue();
    const updated: IMessage[] = [message, ...current];

    this.messagesSubject.next(updated);

    setTimeout(() => {
      this.closeMessage(message);
    }, 5000);
  }

  showInfo(message: string = 'Информация для пользователя'): void {
    this.addMessage(MessageType.INFO, message);
  }

  showWarn(message: string = 'Предупреждение'): void {
    this.addMessage(MessageType.WARN, message);
  }

  showError(message: string = 'Произошла ошибка'): void {
    this.addMessage(MessageType.ERROR, message);
  }

  showSuccess(message: string = 'операция выполнена успешно'): void {
    this.addMessage(MessageType.SUCCESS, message);
  }

  closeMessage(message: IMessage): void {
    const current: IMessage[] = this.messagesSubject.getValue();
    const updated: IMessage[] = current.filter((m: IMessage) => m !== message);

    this.messagesSubject.next(updated);
  }

}
