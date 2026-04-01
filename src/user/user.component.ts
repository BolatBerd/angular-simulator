import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserService } from '../classes/user.service';
import { inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Observable, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe, LoaderComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {

  private userService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.userService.users$;

  constructor() {
    this.userService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.userService.setUsers(users))
      ).subscribe();
  }

}
