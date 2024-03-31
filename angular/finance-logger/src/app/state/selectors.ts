import { Observable } from "rxjs";
import { Category } from "../models/category";
import { AppState } from "./state";

export const categories = (state: { categories: AppState }) =>
  state.categories.categories;