import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UserSubject } from '../classes/user.service';
import { inject } from '@angular/core';
import { LoaderComponent } from '../loader/loader.component';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';

@Component({
  selector: 'app-user',
  imports: [AsyncPipe, LoaderComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  private usersApi: UserSubject = inject(UserSubject);
  users$: Observable<IUser[]> = this.usersApi.users$;

  ngOnInit(): void {
    this.usersApi.loadUsers().subscribe(users => this.usersApi.setUsers(users));
  }

}
