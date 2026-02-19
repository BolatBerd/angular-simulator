import { Injectable } from "@angular/core";
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: IMessage[] = [];

  getMessages(): IMessage[] {
    return this.messages;
  }

  private addMessage(type: MessageType, text: string): void {
    const message: IMessage = { type, text };
    this.messages = [message, ...this.messages];

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
    this.messages = this.messages.filter((m: IMessage) => m !== message);
  }

}
