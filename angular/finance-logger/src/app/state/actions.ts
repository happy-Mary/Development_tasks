import { createAction, props, emptyProps, createActionGroup } from "@ngrx/store";
import { Category } from "../models/category";

export const categoryActions = createActionGroup({
  source: 'Category List',
  events: {
    'Add Category': props<{ category: Category }>(),
    'Delete Category': props<{ name: string }>(),
    'Update Category': props<{ category: Category }>(),
    'Delete All Categories': emptyProps(),
  }
});

//* creating by single action [createAction] (EXAMPLE)
// export const addCategory = createAction(
//   "[Category List] Add Category",
//   props<{ category: Category }>()
// );

// export const deleteCategory = createAction(
//   "[Category List] Delete Category",
//   props<{name: string}>()
// );