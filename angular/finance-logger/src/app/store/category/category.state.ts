import { Category } from '../../models/category';

export interface CategoryState {
  list: Category[];
}

export const initialCategoryState: CategoryState = {
  list: [],
};

