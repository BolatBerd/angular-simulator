import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../classes/local-storage.service';
import { inject, Injectable } from '@angular/core';
import { MessageService } from '../../classes/message.service';
import { IAuthToken } from './IAuthToken';
import { Router } from '@angular/router';
import { IAuth } from './IAuth';
import { IAuthResponse } from './IAuthResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService =inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private userSubject: BehaviorSubject<IAuth | null> = new BehaviorSubject<IAuth | null>(null);
  user$: Observable<IAuth | null> = this.userSubject.asObservable();

  private apiLoginUrl: string = 'https://dummyjson.com/auth/login';
  private refreshTokenUrl: string = 'https://dummyjson.com/auth/refresh';

  private readonly STORAGE_KEY: string = 'authTokens';

  private saveTokens(tokens: IAuthToken): void {
    this.localStorageService.setItem(this.STORAGE_KEY, tokens);
  }

  private removeTokens(): void {
    this.localStorageService.removeItem(this.STORAGE_KEY);
  }

  private getTokens(): IAuthToken | null {
    return this.localStorageService.getItem(this.STORAGE_KEY);
  }

  login(username: string, password: string): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.apiLoginUrl, { username, password })
      .pipe(
         tap((response: IAuthResponse) => {
          this.saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
          this.userSubject.next(response);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Неверные данные.');
          return throwError(() => error);
        })
      )
  }

  refreshToken(): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.refreshTokenUrl, { refreshToken: this.getRefreshToken() })
      .pipe(
        tap((response: IAuthResponse) => {
          this.saveTokens({
            accessToken: response.accessToken,
            refreshToken: response.refreshToken
          });
          this.userSubject.next(response);
        }),
        catchError((error: HttpErrorResponse) => {
          this.logout();
          this.messageService.showError('Неверные данные.');
          return throwError(() => error);
        })
      )
  }

  logout(): void {
    this.removeTokens();
    this.userSubject.next(null);
    this.redirectToLoginPage();
  }

  getAccessToken(): string | undefined {
    return this.getTokens()?.accessToken;
  }

  getRefreshToken(): string | undefined {
    return this.getTokens()?.refreshToken;
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  redirectToLoginPage(): void {
    this.router.navigate(['/auth']);
  }

}

