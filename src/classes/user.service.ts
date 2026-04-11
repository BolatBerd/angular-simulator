import { Injectable,inject  } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { users } from '../app/training';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private isUsersInLocalStorage: boolean = true;

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  constructor() {
    if(this.isUsersInLocalStorage) {
      const usersFromStorage = localStorage.getItem('users');
      if (usersFromStorage) {
        this.usersSubject.next(JSON.parse(usersFromStorage) as IUser[]);
        return;
      }
    }
    this.loadUsers().subscribe();
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    localStorage.setItem('users', JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.userApiService.getUsers()
      .pipe(
        tap((serverUsers: IUser[]) => {
          // 🔄 Мержим локально добавленных пользователей с данными с сервера
          const currentUsers = this.usersSubject.getValue();
          
          // 📌 Находим максимальный ID с сервера
          const maxServerID = serverUsers.length > 0 
            ? Math.max(...serverUsers.map(u => u.id))
            : 0;
          
          // 🔍 Выделяем локально добавленных (их ID > maxServerID)
          const locallyAdded = currentUsers.filter(u => u.id > maxServerID);
          
          // ✨ Мержим: данные с сервера + локально добавленные
          const mergedUsers = [...serverUsers, ...locallyAdded];
          
          // 💾 Обновляем localStorage и BehaviorSubject
          this.setUsers(mergedUsers);
          
          // ✅ Показываем сообщение об успехе
          this.messageService.showSuccess(`Загружено ${serverUsers.length} пользователей`);
        }),
        catchError(() => {
          this.messageService.showError('Ошибка при загрузке пользователей');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      );
  }

  deleteUser(user: IUser): void {
    const currentUsers = this.usersSubject.getValue();
    const updatedUsers = currentUsers.filter(u => u.id !== user.id);
    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const currentUsers = this.getUsers();
    const updatedUsers = [...currentUsers, user];
    this.setUsers(updatedUsers);
  }
}
