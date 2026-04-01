import { Injectable,inject  } from '@angular/core';
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

  private userApiService: UserApiService = inject(UserApiService);
  private loaderService: LoaderService = inject(LoaderService);
  private messageService: MessageService = inject(MessageService);

  private usersSubject: BehaviorSubject<IUser[]> = new BehaviorSubject<IUser[]>([]);
  users$: Observable<IUser[]> = this.usersSubject.asObservable();

  setUsers(users: IUser[]): void {
    this.usersSubject.next(users);
  }

  getUsers(): IUser[] {
    return this.usersSubject.getValue();
  }

  loadUsers(): Observable<IUser[]> {
    this.loaderService.showLoader();

    return this.userApiService.getUsers()
      .pipe(
        catchError(() => {
          this.messageService.showError('Ошибка при загрузке пользователей');
          return of([]);
        }),
        finalize(() => this.loaderService.hideLoader())
      );
  }

}
