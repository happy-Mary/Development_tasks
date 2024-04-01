import { ActionReducer, createReducer, on } from '@ngrx/store';

import * as actions from './category.actions';
import { CategoryState, initialState } from './category.state';

const { categoryActions } = actions;

export const categoryReducer: ActionReducer<CategoryState> = createReducer(
  initialState,
  on(categoryActions.deleteAllCategories, (state): CategoryState => ({
    ...state,
    list: [],
  })),
  on(categoryActions.categoriesListSuccess, (state, { payload }): CategoryState => ({
    ...state,
    list: [...payload],
  })),
  on(categoryActions.addCategorySuccess, (state, { payload }): CategoryState => ({
    ...state,
    list: [...state.list, payload],
  })),
  on(categoryActions.deleteCategorySuccess, (state, { id }): CategoryState => ({
    ...state,
    list: state.list.filter((cat) => cat.id !== id),
  })),
);


// TODO: ???
// export function reducer(state: CategoryState, action: Action): CategoryState {
//   return _reducer(state, action);
// }
