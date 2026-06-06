import { inject, Injectable } from '@angular/core';
import { IPost } from './IPost';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError, tap, finalize } from 'rxjs';
import { MessageService } from '../../classes/message.service';
import { LoaderService } from '../../classes/loader.service';
import { IPostsResponse } from './IPostResponse';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  private messageService: MessageService = inject(MessageService);
  private loaderService: LoaderService = inject(LoaderService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  post$: Observable<IPost[]> = this.postsSubject.asObservable();

  private http: HttpClient = inject(HttpClient);
  private apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(page: number, pageSize: number): Observable<IPostsResponse> {
    const skip: number = (page - 1) * pageSize;
    return this.http.get<IPostsResponse>(
      this.apiUrl,
      {
        params: {
          skip: skip.toString(),
          limit: pageSize.toString(),
         },
    }).pipe(
      tap((response: IPostsResponse) => {
        this.postsSubject.next(response.posts);
      }),
      catchError((error) => {
        this.messageService.showError('Не удалось загрузить список постов.');
        return throwError(() => error);
      }),
      finalize(() => this.loaderService.hideLoader())
    );
  }

  getPostById(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.get<IPost>(`${this.apiUrl}/${id}`)
      .pipe(
        tap((post: IPost) => {
          this.loaderService.hideLoader();
          console.log('Пост успешно загружен:', post);
        }),
        catchError((error) => {
          this.messageService.showError('Не удалось загрузить пост.');
          return throwError(() => error);
        })
      );
  }

  createPost(post: IPost): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.post<IPost>(`${this.apiUrl}/add`, post)
      .pipe(
        tap((createdPost: IPost) => {
          this.loaderService.hideLoader();
          const currentPosts: IPost[] = this.postsSubject.getValue();
          const updatedPosts: IPost[] = [...currentPosts, createdPost];
          this.postsSubject.next(updatedPosts);
        }),
        catchError((error) => {
          this.messageService.showError('Не удалось добавить пост.');
          this.loaderService.hideLoader();
          return throwError(() => error);
        })
      );
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.put<IPost>(
      `${this.apiUrl}/${id}`,
      post
    ).pipe(
      tap((updatedPost: IPost) => {
        this.loaderService.hideLoader();
        const currentPosts: IPost[] = this.postsSubject.getValue();
        const updatedPosts: IPost[] = currentPosts.map((p: IPost) =>
          p.id === updatedPost.id ? { ...p, ...updatedPost } : p
        );

        this.postsSubject.next(updatedPosts);
      }),
      catchError((error) => {
        this.messageService.showError('Не удалось обновить пост.');
        return throwError(() => error);
      })
    );
  }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.delete<IPost>(
      `${this.apiUrl}/${id}`
    ).pipe(
      tap(() => {
        this.loaderService.hideLoader();
        const currentPosts = this.postsSubject.getValue();
        this.postsSubject.next(currentPosts.filter((p: IPost) => p.id !== id));
      }),
      catchError((error) => {
        this.messageService.showError('Не удалось удалить пост.');
        return throwError(() => error);
      })
    );
  }

}
