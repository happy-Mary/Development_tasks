import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LogsState } from "./logs.state";

// export const selectLogs = (state: { logs: LogsState }) => state.logs.logs;

export const selectLogsFeature = createFeatureSelector<LogsState>('logsFeature');

export const selectLogsData = createSelector(
  selectLogsFeature,
  (state: LogsState) => state.logs
);