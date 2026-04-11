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
  filterQuery: string = '';  // 🔍 Хранит значение фильтра

  ngOnInit(): void {
    // 📡 Подписываемся на изменения пользователей из сервиса
    // Когда данные меняются в localStorage/API, обновляем локальный список
    this.userService.users$.subscribe((updatedUsers: IUser[]) => {
      this.users = updatedUsers;
    });
  }

  // ✨ Getter для фильтрованного списка
  // Автоматически пересчитывается когда меняется filterQuery или users
  get filteredUsers(): IUser[] {
    if (!this.filterQuery.trim()) {
      return this.users;  // Если фильтр пуст - показываем всех
    }

    const query = this.filterQuery.toLowerCase();
    return this.users.filter(user =>
      user.name.toLowerCase().includes(query)
    );
  }

  onCreateUser(user: IUser): void {
    this.userService.addUser(user);
    // ✅ Данные обновляются в localStorage автоматически
    // ✅ users$ Observable уведомит нас через subscribe
  }

  onDeleteUser(user: IUser): void {
    this.userService.deleteUser(user);
    // ✅ Данные обновляются в localStorage автоматически
    // ✅ users$ Observable уведомит нас через subscribe
  }

  refreshUsers(): void {
    // 🔄 Загружает с сервера (перезаписывает localStorage)
    this.userService.loadUsers().subscribe(() => {
      // После загрузки сервис автоматически уведомит us$ Observable
      // Спасибо finalize() в loadUsers()
    });
  }

}
