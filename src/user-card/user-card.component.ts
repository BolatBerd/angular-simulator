import { Component, Input, OnInit } from '@angular/core';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user-card',
  standalone: true,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {

  @Input({ required: true }) user!: IUser;

  ngOnInit(): void {
    if (!this.user) {
      throw new Error('Требует ввода данных пользователем');
    }
  }

}
