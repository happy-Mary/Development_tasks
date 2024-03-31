import { Action, ActionReducer, createReducer, on } from "@ngrx/store";

import * as actions from "./actions";
import { AppState, initialState } from "./state";

const { categoryActions } = actions;

export const reducer = createReducer(
  initialState,
  on(categoryActions.addCategory, (state, {category}) => ({
    ...state,
    categories: [...state.categories, category],
  })),
  on(categoryActions.deleteCategory, (state, { name }) => ({
    ...state,
    categories: state.categories.filter(cat => cat.name !== name)
  })),
  on(categoryActions.deleteAllCategories, (state) => ({
    ...state,
    categories: [],
  })),
);

// export function reducer(state: AppState, action: Action): AppState {
//   return _reducer(state, action);
// }


