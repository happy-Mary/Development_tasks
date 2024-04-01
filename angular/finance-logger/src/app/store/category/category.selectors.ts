import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { AppState } from '../index';
import { CategoryState } from './category.state';


export const selectCategories = (state: { categories: CategoryState }) =>
  state.categories.list;

// export const categories = (state: CategoryState) => state.list;
