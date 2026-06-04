import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PostApiService } from './post-api.service';
import { IPost } from './IPost';

@Injectable({
  providedIn: 'root',
})
export class PostResolver implements Resolve<IPost> {
  constructor(private postApiService: PostApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IPost> {
    const id: string | null = route.paramMap.get('id');
    return this.postApiService.getPostById(+id!);
  }
}
