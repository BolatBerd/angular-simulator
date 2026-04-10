import { Component, inject } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';

@Component({
  selector: 'app-users-page',
  imports: [CreateUserComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent {


 private userService: UserService = inject(UserService);

 users: IUser[] = [];

 constructor(){
  this.users = this.userService.getUsers();
 }

  onCreateUser(user: IUser): void{
    const updated = [...this.users, user];
    this.users = updated;
    this.userService.setUsers(updated);
  }

}
