import { ActionReducer, createReducer, on } from '@ngrx/store';

import * as actions from './category.actions';
import { CategoryState, initialState } from './category.state';

const { categoryActions } = actions;

export const categoryReducer: ActionReducer<CategoryState> = createReducer(
  initialState,
  on(categoryActions.addCategory, (state, { category }) => ({
    ...state,
    categories: [...state.list, category],
  })),
  on(categoryActions.deleteCategory, (state, { name }) => ({
    ...state,
    categories: state.list.filter((cat) => cat.name !== name),
  })),
  on(categoryActions.deleteAllCategories, (state) => ({
    ...state,
    categories: [],
  }))
);
// TODO: ???
// export function reducer(state: CategoryState, action: Action): CategoryState {
//   return _reducer(state, action);
// }
