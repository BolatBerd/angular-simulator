import { createReducer, on } from '@ngrx/store';
import { IRecipe } from '../interfaces/IRecipe';
import { IRecipesState } from '../interfaces/IRecipesState';
import * as RecipesActions from './recipes.actions';

export const initialState: IRecipesState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer = createReducer(
  initialState,
  on(RecipesActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RecipesActions.loadRecipesSuccess, (state, { recipes }) => ({
    ...state,
    recipes,
    loading: false,
  })),
  on(RecipesActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
