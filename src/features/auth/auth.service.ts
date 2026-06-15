import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../classes/local-storage.service';
import { inject, Injectable } from '@angular/core';
import { MessageService } from '../../classes/message.service';
import { AuthApiService } from './auth-api.service';
import { Router } from '@angular/router';
import { IAuth } from './IAuth';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private localStorageService: LocalStorageService =inject(LocalStorageService);
  private messageService: MessageService = inject(MessageService);
  private authApiService: AuthApiService = inject(AuthApiService);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);

  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());
  auth$: Observable<boolean> = this.authSubject.asObservable();

  private expiresInMinsSubject: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  expiresInMins$: Observable<Date> = this.expiresInMinsSubject.asObservable();

  expiresInMins: number = 30;

  private saveTokens(accessToken: string, refreshToken: string): void {
    this.localStorageService.setItem('accessToken', accessToken);
    this.localStorageService.setItem('refreshToken', refreshToken);
  }

  private daleteTokens(): void {
    this.localStorageService.removeItem('accessToken');
    this.localStorageService.removeItem('refreshToken');
  }

  login(username: string, password: string): Observable<IAuth> {
    const user: IUser = { username, password}
    return this.http.post<IAuth>(this.authApiService.login(), user)
      .pipe(
         tap((response: IAuth) => {
          this.setTokenExpiration(this.expiresInMins);
          this.saveTokens(response.accessToken, response.refreshToken);
          this.authSubject.next(true);
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Неверные данные.');
          return throwError(() => error);
        })
      )
  }

  refreshToken(): Observable<IAuth> {
    return this.http.post<IAuth>(this.authApiService.refreshToken(), { refreshToken: this.getRefreshToken() })
      .pipe(
        tap((response: IAuth) => {
          this.setTokenExpiration(this.expiresInMins);
          this.saveTokens(response.accessToken, response.refreshToken);
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

  setTokenExpiration(expiresInMins: number): void {
    const currentDate: Date = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + expiresInMins * 60);
    this.expiresInMinsSubject.next(currentDate);
  }

}
