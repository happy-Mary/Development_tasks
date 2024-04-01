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
    'Update Category': props<{ category: Category }>(),
    'Delete All Categories': emptyProps(),
    'Categories List Load': emptyProps(),
    'Categories List Success': props<{ payload: Category[] }>(),
    'Categories List Error': emptyProps(),
    'Add Category': props<{ category: Category }>(),
    'Add Category Success': props<{ payload: Category }>(),
    'Add Category Error': emptyProps(),
    'Delete Category': props<{ id: string }>(),
    'Delete Category Success': props<{ id: string }>(),
    'Delete Category Error': emptyProps(),
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
