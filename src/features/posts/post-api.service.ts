import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from '../../classes/message.service';
import { IPostsResponse } from './IPostResponse';
import { LoaderService } from '../../classes/loader.service';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);
  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(page: number, pageSize: number): Observable<IPostsResponse> {
    const skip: number = (page - 1) * pageSize;
    return this.http.get<IPostsResponse>(this.apiUrl, {
        params: {
          skip: skip.toString(),
          limit: pageSize.toString(),
         },
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError('Не удалось загрузить список постов.');
        return throwError(() => error);
      }),
    );
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось загрузить пост.');
          return throwError(() => error);
        })
      );
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.apiUrl}/add`, post)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось добавить пост.');
          return throwError(() => error);
        })
      );
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.put<IPost>(`${this.apiUrl}/${id}`, post)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError('Не удалось обновить пост.');
        return throwError(() => error);
      })
    );
  }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.delete<IPost>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        this.messageService.showError('Не удалось удалить пост.');
        return throwError(() => error);
      })
    );
  }

}
