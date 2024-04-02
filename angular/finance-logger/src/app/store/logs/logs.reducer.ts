import { ActionReducer, createReducer, on } from '@ngrx/store';
import * as actions from './logs.actions';
import { LogsState, initialLogsState } from './logs.state';

const { logsActions } = actions; 

export const logsReducer: ActionReducer<LogsState> = createReducer(
  initialLogsState,
  on(logsActions.logsListSuccess, (state, { payload }) => ({
    ...state,
    logs: payload,
  })),
  on(logsActions.addLogSuccess, (state, { payload }) => ({
    ...state,
    logs: [...state.logs, payload],
  })),
);