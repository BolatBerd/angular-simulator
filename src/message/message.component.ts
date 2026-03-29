import { Component, inject } from '@angular/core';
import { IMessage } from '../interfaces/IMessage';
import { MessageService } from '../classes/message.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";

@Component({
  selector: 'app-message',
  imports: [FormsModule, CommonModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent {

  private messageService: MessageService = inject(MessageService);

  messages$: Observable<IMessage[]> = this.messageService.messages$;

  closeMessage(message: IMessage): void {
    this.messageService.closeMessage(message);
  }

}
