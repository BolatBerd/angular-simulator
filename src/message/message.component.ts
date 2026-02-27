import { Component, inject } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageService } from '../classes/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
})
export class MessageComponent {

  messageService: MessageService = inject(MessageService);

  get messages(): IMessage[] {
    return this.messageService.getMessages();
  }

  closeMessage(message: IMessage): void {
    this.messageService.closeMessage(message);
  }

}
