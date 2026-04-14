import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { Observable, take, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-users-page',
  imports: [
    CreateUserComponent,
    UserCardComponent,
    FormsModule,
    UsersFilterComponent,
    AsyncPipe],
  templateUrl: './users-page.component.html',
  styleUrl: './users-page.component.scss',
})
export class UsersPageComponent implements OnInit {

  private userService: UserService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  filteredUsers$: Observable<IUser[]> = this.userService.filteredUsers$;
  users: IUser[] = [];

  onFilterUser(value: string): void {
    this.userService.filterUsers(value);
  }

  ngOnInit(): void {
    this.userService.users$.subscribe((updatedUsers: IUser[]) => {
      this.users = updatedUsers;
    });
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
