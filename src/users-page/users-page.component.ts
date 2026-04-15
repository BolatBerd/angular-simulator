import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { CreateUserComponent } from '../create-user/create-user.component';
import { IUser } from '../interfaces/IUser';
import { UserService } from '../classes/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { UsersFilterComponent } from '../users-filter/users-filter.component';
import { AsyncPipe } from '@angular/common';
import { MessageService } from '../classes/message.service';

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
  private messageService: MessageService = inject(MessageService);

  filteredUsers$: Observable<IUser[]> = this.userService.filteredUsers$;
  users: IUser[] = [];
  // public nextId: number = 1;

  onFilterUser(value: string): void {
    this.userService.filterUsers(value);
  }

  ngOnInit(): void {
    this.userService.loadUsers().subscribe();
    // this.userService.users$.subscribe((updatedUsers: IUser[]) => {
    // this.users = updatedUsers;
    // this.nextId = this.getNextId();
    // });
  }

  // private getNextId(): number {
  //   return this.users.length > 0 ? Math.max(...this.users.map((u: IUser) => u.id)) + 1 : 1;
  // }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
    // this.nextId++;
    this.messageService.showSuccess('Пользователь создан успешно');
  }

  onDeleteUser(userId: number): void {
    this.userService.deleteUserById(userId);
  }

  refreshUsers(): void {
    this.userService.loadUsers(true).pipe(
      tap((user: IUser[]) => this.userService.setUsers(user))
    ).subscribe();
  }

}
