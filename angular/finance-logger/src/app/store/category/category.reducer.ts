import { ActionReducer, createReducer, on } from '@ngrx/store';

import * as actions from './category.actions';
import { CategoryState, initialState } from './category.state';

const { categoryActions } = actions;

export const categoryReducer: ActionReducer<CategoryState> = createReducer(
  initialState,
  on(categoryActions.addCategory, (state, { category }): CategoryState => ({
    ...state,
    list: [...state.list, category],
  })),
  on(categoryActions.deleteCategory, (state, { name }): CategoryState => ({
    ...state,
    list: state.list.filter((cat) => cat.name !== name),
  })),
  on(categoryActions.deleteAllCategories, (state): CategoryState => ({
    ...state,
    list: [],
  })),
  on(categoryActions.categoriesListSuccess, (state, { payload }) => ({
    ...state,
    list: [...payload],
  }))
);
// TODO: ???
// export function reducer(state: CategoryState, action: Action): CategoryState {
//   return _reducer(state, action);
// }
