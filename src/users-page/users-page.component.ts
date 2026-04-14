import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersFilterComponent } from '../users-filter/users-filter.component';

@Component({
  selector: 'app-users-page',
  imports: [CreateUserComponent, UserCardComponent, FormsModule, UsersFilterComponent],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private destroyRef = inject(DestroyRef);

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

    const query: string = this.filterQuery.toLowerCase();
    return this.users.filter((user: IUser) =>
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
    this.userService.loadUsers(true).pipe(
      tap((user: IUser[]) => this.userService.setUsers(user)),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

}
