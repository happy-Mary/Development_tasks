import { createActionGroup, props, emptyProps } from "@ngrx/store";
import { Log } from  './../../models/logs';

export const logsActions = createActionGroup({
  source: 'Logs List',
  events: {
    'Logs List Load': emptyProps(),
    'Logs List Success': props<{ payload: Log[], message?: string }>(),
    'Logs List Error': props<{ message: string }>(),
    'Add Log': props<{ log: Log }>(),
    'Add Log Success': props<{ payload: Log, message?: string }>(),
    'Add Log Error': props<{ message: string }>(),
  }
});