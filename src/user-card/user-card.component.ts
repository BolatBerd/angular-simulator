import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { UserService } from '../classes/user.service';

@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe],
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  private userService: UserService = inject(UserService);

  @Input({ required: true }) user!: IUser;
  @Output() userDeleted: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(): void {
    this.userDeleted.emit(this.user.id);
  }

}
