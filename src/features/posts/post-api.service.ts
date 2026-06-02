import { inject, Injectable } from '@angular/core';
import { IPost } from './IPost';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError, tap } from 'rxjs';
import { LocalStorageService } from '../../classes/local-storage.service';
import { MessageService } from '../../classes/message.service';
import { LoaderService } from '../../classes/loader.service';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  localStorageService: LocalStorageService = inject(LocalStorageService);
  messageService: MessageService = inject(MessageService);
  loaderService: LoaderService = inject(LoaderService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  post$: Observable<IPost[]> = this.postsSubject.asObservable();

  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.http.get<IPost>(`${this.apiUrl}/${id}`)
      .pipe(
        tap((post) => {
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
      tap((updatedPost) => {
        this.loaderService.hideLoader();
        const currentPosts = this.postsSubject.getValue();
        const index = currentPosts.findIndex(p => p.id === updatedPost.id);
        if (index !== -1) {
          currentPosts[index] = { ...currentPosts[index], ...updatedPost };
          this.postsSubject.next([...currentPosts]);
        }
      }),
      catchError((error) => {
        this.messageService.showError('Не удалось обновить пост.');
        return throwError(() => error);
      })
    );
  }

  deletePost(id: number){
    this.loaderService.showLoader();
    return this.http.delete<IPost>(
      `${this.apiUrl}/${id}`
    ).pipe(
      tap(() => {
        this.loaderService.hideLoader();
        const currentPosts = this.postsSubject.getValue();
        const updatedPosts = currentPosts.filter(p => p.id !== id);
        this.postsSubject.next(updatedPosts);
      }),
      catchError((error) => {
        this.messageService.showError('Не удалось удалить пост.');
        return throwError(() => error);
      })
    );
  }

}
