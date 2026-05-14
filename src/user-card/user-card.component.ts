import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { UserService } from '../classes/user.service';
import { PhoneNumbersPipe } from '../pipes/phone-numbers.pipe';
import { PhoneModes } from '../enums/PhoneModes';
import { PhoneModesService } from '../classes/phone-modes.service';


@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneNumbersPipe, AsyncPipe],
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  private userService: UserService = inject(UserService);
  phoneModesService: PhoneModesService = inject(PhoneModesService)
  PhoneModes: typeof PhoneModes = PhoneModes;

  @Input({ required: true }) user!: IUser;
  @Output() userDeleted: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(): void {
    this.userDeleted.emit(this.user.id);
  }

}
