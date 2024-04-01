import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';
import { Category } from '../../models/category';

export const categoryActions = createActionGroup({
  source: 'Category List',
  events: {
    'Categories List Load': emptyProps(),
    'Categories List Success': props<{ payload: Category[], message?: string }>(),
    'Categories List Error': props<{ message: string }>(),
    'Add Category': props<{ category: Category }>(),
    'Add Category Success': props<{ payload: Category, message?: string }>(),
    'Add Category Error': props<{ message: string }>(),
    'Delete Category': props<{ id: string }>(),
    'Delete Category Success': props<{ id: string, message?: string }>(),
    'Delete Category Error': props<{ message: string }>(),
    'Update Category': props<{ category: Category }>(),
    'Delete All Categories': emptyProps(),
  },
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
