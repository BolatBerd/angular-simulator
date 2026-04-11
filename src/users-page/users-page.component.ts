import { Component, inject, OnInit } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-page',
  imports: [CreateUserComponent, UserCardComponent, FormsModule],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);

  users: IUser[] = [];
  filterQuery: string = '';

  ngOnInit(): void {
    this.userService.users$.subscribe((updatedUsers: IUser[]) => {
      this.users = updatedUsers;
    });
  }

  get filteredUsers(): IUser[] {
    if (!this.filterQuery.trim()) {
      return this.users;
    }

    const query = this.filterQuery.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(query)
    );
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
  }

  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user);
  }

  refreshUsers(): void {
    this.userService.loadUsers().subscribe(() => {
    });
  }

  clearAllUsers(): void {
    if (confirm('⚠️ Вы уверены? Это удалит всех пользователей!')) {
      this.userService.clearAll();
      this.filterQuery = '';
    }
  }

}
