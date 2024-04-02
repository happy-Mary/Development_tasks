import { CategoryState } from './category';
import { LogsState } from './logs';

export interface AppState {
  categories: CategoryState;
  logs: LogsState;
}