import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { UpperCasePipe } from '@angular/common';
import { PhoneNumbersPipe } from '../pipes/phone-numbers.pipe';
import { PhoneMode } from '../enums/PhoneMode';
import { PhoneModesService } from '../classes/phone-modes.service';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-user-card',
  imports: [UpperCasePipe, PhoneNumbersPipe, TranslatePipe],
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {

  phoneModesService: PhoneModesService = inject(PhoneModesService);
  modePhone: PhoneMode = PhoneMode.MASKED;

  @Input({ required: true }) user!: IUser;
  @Output() userDeleted: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick(): void {
    this.userDeleted.emit(this.user.id);
  }

}
