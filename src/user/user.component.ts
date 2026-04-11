import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../classes/user.service';
import { inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { UserCardComponent } from '../user-card/user-card.component';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UsersPageComponent } from "../users-page/users-page.component";

@Component({
  selector: 'app-user',
  imports: [AsyncPipe, LoaderComponent, UserCardComponent, UsersPageComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

  private userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
  }

  onDeleteUser(user: IUser) {
    this.userService.deleteUser(user);
  }
}
