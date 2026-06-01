import { inject, Injectable } from '@angular/core';
import { IPost } from './IPost';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, throwError, tap } from 'rxjs';
import { LocalStorageService } from '../../classes/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {

  localStorageService: LocalStorageService = inject(LocalStorageService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  post$: Observable<IPost[]> = this.postsSubject.asObservable();

  private http: HttpClient = inject(HttpClient);

  private apiUrl: string = 'https://dummyjson.com/posts';

  getPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(this.apiUrl);
  }

  getPostById(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${this.apiUrl}/${id}`);
  }

  createPost(post: IPost): Observable<IPost> {
    return this.http.post<IPost>(`${this.apiUrl}/add`, post)
      .pipe(
        tap((createdPost: IPost) => {
          const currentPosts: IPost[] = this.postsSubject.getValue();
          const updatedPosts: IPost[] = [...currentPosts, createdPost];
          this.postsSubject.next(updatedPosts);
          this.localStorageService.setItem('post', updatedPosts);
        })
      );
  }

  updatePost(id: number, post: Partial<IPost>): Observable<IPost> {
  return this.http.put<IPost>(
    `${this.apiUrl}/${id}`,
    post
  ).pipe(
    tap((updatedPost) => {
      const currentPosts = this.postsSubject.getValue();
      const index = currentPosts.findIndex(p => p.id === updatedPost.id);
      if (index !== -1) {
        currentPosts[index] = { ...currentPosts[index], ...updatedPost };
        this.postsSubject.next([...currentPosts]);
        this.localStorageService.setItem('posts', currentPosts);
      }
    }),
    catchError((error) => {
      console.error('Ошибка обновления поста', error);
      return throwError(() => error);
    })
  );
}

  deletePost(id: number){
    return this.http.delete<IPost>(
      `${this.apiUrl}/${id}`
    ).pipe(
      tap(() => {
        const currentPosts = this.postsSubject.getValue();
        const updatedPosts = currentPosts.filter(p => p.id !== id);
        this.postsSubject.next(updatedPosts);
        this.localStorageService.setItem('posts', updatedPosts);
      })
    );
  }

}
