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

  addMessage(type: MessageType, text: string): void {
    const message: IMessage = { type, text };
    this.messages = [message, ...this.messages];

    setTimeout(() => {
      this.closeMessage(message);
    }, 5000);
  }

  closeMessage(message: IMessage): void {
    this.messages = this.messages.filter(m => m !== message);
  }

}
