import { Injectable, inject } from '@angular/core';
import { IRecipesResponse } from '../interfaces/IRecipesResponse';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeApiService {

  private http: HttpClient = inject(HttpClient);
  private baseUrl: string = 'https://dummyjson.com/recipes';

  getRecipes(): Observable<IRecipesResponse> {
    return this.http.get<IRecipesResponse>(this.baseUrl);
  }
  
}
