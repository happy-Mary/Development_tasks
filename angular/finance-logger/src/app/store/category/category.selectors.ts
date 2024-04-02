import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.state';

// export const selectCategories = (state: { categories: CategoryState }) =>
//   state.categories.list;

export const selectCategoriesFeature =
  createFeatureSelector<CategoryState>('categoryFeature');

export const selectCategories = createSelector(
  selectCategoriesFeature,
  (state: CategoryState) => state.list
);

