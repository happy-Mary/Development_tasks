import { Category } from '../../models/category';

export interface CategoryState {
  list: Category[];
}

export const initialState: CategoryState = {
  list: [{ name: 'Example Category' }],
};

