import { Category } from "../models/category";

export interface AppState {
  categories: Category[];
}

export const initialState: AppState = {
  categories: [{ name: 'First Category'}],
};