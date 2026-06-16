import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../classes/local-storage.service';
import { inject, Injectable } from '@angular/core';
import { MessageService } from '../../classes/message.service';
import { IAuthTokens } from './IAuthTokens';
import { Router } from '@angular/router';
import { IAuth } from './IAuth';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService =inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  auth$: Observable<boolean> = this.authSubject.asObservable();

  private apiLoginUrl: string = 'https://dummyjson.com/auth/login';
  private refreshTokenUrl: string = 'https://dummyjson.com/auth/refresh';

  private readonly STORAGE_KEY = 'authTokens'

  private saveTokens(tokens: IAuthTokens): void {
    this.localStorageService.setItem(this.STORAGE_KEY, tokens);
  }

  private daleteTokens(): void {
    this.localStorageService.removeItem(this.STORAGE_KEY);
  }

  private getTokens(): IAuthTokens | null {
    return this.localStorageService.getItem(this.STORAGE_KEY);
  }

  login(username: string, password: string): Observable<IAuth> {
    const user: IUser = { username, password }
    return this.http.post<IAuth>(this.apiLoginUrl, user)
      .pipe(
         tap((response: IAuth) => {
          this.saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
          this.authSubject.next(true);
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
          this.saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
          this.authSubject.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          this.logout();
          this.messageService.showError('Неверные данные.');
          return throwError(() => error);
        })
      )
  }

  logout(): void {
    this.daleteTokens();
    this.authSubject.next(false);
    this.goToLogin();
  }

  getAccessToken(): string | undefined {
    return  this.getTokens()?.accessToken;
  }

  getRefreshToken(): string | undefined {
    return  this.getTokens()?.refreshToken;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  goToLogin(): void {
    this.router.navigate(['/auth']);
  }

}

