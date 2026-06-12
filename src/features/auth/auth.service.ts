import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAuth } from './IAuth';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { MessageService } from '../../classes/message.service';
import { LocalStorageService } from '../../classes/local-storage.service';
import { Router } from '@angular/router';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService =inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private postsSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  posts$: Observable<boolean> = this.postsSubject.asObservable();

  private refreshTokenUrl: string = 'https://dummyjson.com/auth/refresh'
  private apiLoginUrl: string = 'https://dummyjson.com/auth/login';

  private saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setItem('accessToken', accessToken);
    this.localStorageService.setItem('refreshToken', refreshToken);
  }

  private daleteTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.removeItem(accessToken);
    this.localStorageService.removeItem(refreshToken);
  }

  login(login: string, password: string): Observable<IAuth> {
    const user: IUser = {login, password, expiresInMins: 30}
    return this.http.post<IAuth>(this.apiLoginUrl, user)
      .pipe(
        tap((response: IAuth) => {
          this.saveTokens(response.accessToken, response.refreshToken)
          this.postsSubject.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Неверные данные.');
          return throwError(() => error);
        })
      )
  }

  refreshToken(): Observable<IAuth> {
    return this.http.post<IAuth>(this.refreshTokenUrl, { refreshToken: this.getRefreshToken() })
      .pipe(
        tap((response: IAuth) => {
          this.saveTokens(response.accessToken, response.refreshToken)
          this.postsSubject.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Неверные данные.');
          return throwError(() => error);
        })
      )
  }

  logout(): void {
    this.daleteTokens('accessToken', 'refreshToken')
    this.postsSubject.next(false);
    this.router.navigate(['/auth']);
  }

  getAccessToken(): string | null {
    return  this.localStorageService.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return  this.localStorageService.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

}
