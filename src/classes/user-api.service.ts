import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { users } from '../app/training';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl).pipe(
      tap(users => {
        localStorage.setItem('users', JSON.stringify(users));
      })
    );
  }


}
