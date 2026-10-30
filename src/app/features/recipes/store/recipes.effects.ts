import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipeApiService } from '../services/recipe-api.service';
import * as RecipesActions from './recipes.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class RecipesEffects {

  private actions$: Actions = inject(Actions);
  private recipeApiService: RecipeApiService = inject(RecipeApiService);

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipesActions.loadRecipes),
      switchMap(() =>
        this.recipeApiService.getRecipes().pipe(
          map((response) => RecipesActions.loadRecipesSuccess({ recipes: response.recipes })),
          catchError((error) => of(RecipesActions.loadRecipesFailure({ error: error.message })))
        )
      )
    )
  );
}
