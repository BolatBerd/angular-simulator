import { Injectable,inject  } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, finalize, map, of, tap } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';
import { FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);
  private readonly USERS_KEY: string = 'users';

  private filterSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  constructor() {
    const usersFromStorage = localStorage.getItem(this.USERS_KEY);

    if (usersFromStorage) {
      const users: IUser[] = JSON.parse(usersFromStorage);
      this.usersSubject.next(users);
    }
  }

  filteredUsers$: Observable<IUser[]> = combineLatest([this.usersSubject, this.filterSubject])
    .pipe(
      map(([users, filter]) => users.filter((user: IUser) =>
        user.name.toLowerCase().includes(filter.toLowerCase())
      )),
    );

  filterUsers(value: string): void {
    this.filterSubject.next(value);
  }

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(forceReload: boolean = false): Observable<IUser[]> {
    const cachedUsers: string | null = localStorage.getItem(this.USERS_KEY);
    if (!forceReload && cachedUsers) {
      const users: IUser[] = JSON.parse(cachedUsers);
      if (users.length > 0) {
        return of(users);
      }
    }

    this.loaderService.showLoader();
    return this.userApiService.getUsers()
      .pipe(
        tap((users: IUser[]) => {
          this.setUsers(users);
          this.messageService.showSuccess(`Загружены пользователи (${users.length})`);
        }),
        catchError((error: HttpErrorResponse) => {
          const errorMessage: string = `Ошибка ${ error.status }: Не удалось загрузить данные`;
          this.messageService.showError(errorMessage);
          this.setUsers([]);
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      );
  }

  deleteUserById(id: number): void {
    const currentUsers: IUser[] = this.usersSubject.getValue();
    const updatedUsers: IUser[] = currentUsers.filter((u: IUser) => u.id !== id);
    this.setUsers(updatedUsers);
  }

  addUser(user: IUser): void {
    const currentUsers: IUser[] = this.getUsers();
    const updatedUsers: IUser[] = [...currentUsers, user];
    this.setUsers(updatedUsers);
  }

  setDefault(group: FormGroup, value: string) {
    for(const name in group.controls) {
      const control = group.controls[name];
      if(control instanceof FormGroup){
        this.setDefault(control as FormGroup, value)
      } else if(!control.hasValidator(Validators.required)) {
        control.patchValue(value)
      }
    }
  }

}
