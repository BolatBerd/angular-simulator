import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRecipesState } from '../interfaces/IRecipesState';

export const selectRecipesState = createFeatureSelector<IRecipesState>('recipes');

export const selectRecipes = createSelector(
  selectRecipesState,
  (state: IRecipesState) => state.recipes
);

export const selectLoading = createSelector(
  selectRecipesState,
  (state: IRecipesState) => state.loading
);

export const selectError = createSelector(
  selectRecipesState,
  (state: IRecipesState) => state.error
);
