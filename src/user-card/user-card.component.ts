import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from '../interfaces/IUser';
import { OutletContext } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  @Input({ required: true }) user!: IUser;
  @Output() deleteUser = new EventEmitter;

  ngOnInit(): void {
    if (!this.user) {
      throw new Error('Требует ввода данных пользователем');
    }
  }

  onDeleteClick() {
    this.deleteUser.emit(this.user);
  }

}
