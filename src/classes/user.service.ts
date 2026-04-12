import { Injectable,inject  } from '@angular/core';
import { BehaviorSubject, catchError, finalize, iif, of, tap } from 'rxjs';
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
          const currentUsers: IUser[] = this.usersSubject.getValue();
          const maxServerID: number = serverUsers.length > 0
            ? Math.max(...serverUsers.map((u: IUser) => u.id))
            : 0;
          const locallyAdded: IUser[] = currentUsers.filter((u: IUser) => u.id > maxServerID);
          const mergedUsers: IUser[] = [...serverUsers, ...locallyAdded];
          this.setUsers(mergedUsers);
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
    const currentUsers: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = currentUsers.filter((u: IUser) => u.id !== user.id);
    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];
    this.setUsers(updatedUsers);
  }

  clearAll(): void {
    this.usersSubject.next([]);
    localStorage.removeItem('users');
    this.messageService.showSuccess('Данные очищены');
  }
}
