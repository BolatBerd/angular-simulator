import { Component, inject } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';
import { UserCardComponent } from '../user-card/user-card.component';

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
    this.userService.addUser(user);
    // const updated = [...this.users, user];
    // this.users = updated;
    // this.userService.setUsers(updated);
  }

  onDeleteUser(user: IUser): void {
    // const updated = this.users.filter(u => u.id !== user.id);
    // this.users = updated;
    // this.userService.setUsers(updated);
    this.userService.deleteUser(user);
  }

}
