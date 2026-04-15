import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  @Input({ required: true }) user!: IUser;
  @Output() onDeleteUser = new EventEmitter<number>;

  onDeleteClick(): void {
    this.onDeleteUser.emit(this.user.id);
  }

}
