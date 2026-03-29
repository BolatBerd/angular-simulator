import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of } from 'rxjs';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { UserApiService } from './user-api.service';
import { LoaderService } from './loader.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([])

  public users$: Observable<IUser[]> = this.usersSubject.asObservable();

  constructor(
    private apiService: UserApiService,
    private loader: LoaderService,
    private messageService: MessageService
  ) {}

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): void {
    this.loader. showLoader();

    this.apiService.getUsers()
      .pipe(
        catchError((error) => {
          this.messageService.showError('Ошибка при загрузке пользователей');
          return of([]);
        }),
        finalize(() => {
          this.loader.hideLoader();
        })
      ).subscribe((users: IUser[]) => {
        this.setUsers(users);
    });
  }
}
