import { Injectable } from "@angular/core";
import { IMessage } from '../interfaces/IMessage';
import { MessageType } from '../enums/MessageType';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private messages: IMessage[] = [];
  messageType = MessageType;

  getMessages(): IMessage[] {
    return this.messages;
  }

  private addMessage(type: MessageType, text: string): void {
    const message: IMessage = { type, text };
    this.messages = [message, ...this.messages];//this.messages = [...this.messages, message]; вот так у меня буден снизу , а у меня сейчас сверху добавляются, могу видео отправить

    setTimeout(() => {
      this.closeMessage(message);
    }, 5000);
  }

  showInfo(): void {
    this.addMessage(
      MessageType.INFO,
      'Информация для пользователя'
    );
  }

  showWarn(): void {
    this.addMessage(
      MessageType.WARN,
      'Предупреждение'
    );
  }

  showError(): void {
    this.addMessage(
      MessageType.ERROR,
      'Произошла ошибка'
    );
  }

  showSuccess(): void {
    this.addMessage(
      MessageType.SUCCESS,
      'операция выполнена успешно'
    );
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter((m: IMessage) => m !== message);
  }

}
