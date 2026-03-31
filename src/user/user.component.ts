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

  private usersService: UserService = inject(UserService);
  users$: Observable<IUser[]> = this.usersService.users$;

  constructor() {
    this.usersService.loadUsers()
      .pipe(
        tap((users: IUser[]) => this.usersService.setUsers(users))
      ).subscribe();
  }

}
