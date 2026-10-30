import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IRecipe } from '../interfaces/IRecipe';
import * as RecipesActions from '../store/recipes.actions';
import { selectRecipes, selectLoading, selectError } from '../store/recipes.selectors';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  recipes$: Observable<IRecipe[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.recipes$ = this.store.select(selectRecipes);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(RecipesActions.loadRecipes());
  }

  onReload(): void {
    this.store.dispatch(RecipesActions.loadRecipes());
  }
  
}
