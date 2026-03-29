import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';
import { inject } from '@angular/core';
import { ObjectUnsubscribedErrorCtor } from 'rxjs/internal/util/ObjectUnsubscribedError';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-user',
  imports: [AsyncPipe],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  private usersSubject: UserService = inject(UserService);

  users$ = this.usersSubject.users$;

  ngOnInit(): void {
    this.usersSubject.loadUsers()
    };

}

