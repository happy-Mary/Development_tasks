import { Log } from '../../models/logs';

export interface LogsState {
  logs: Log[];
  loading: {
    list: boolean;
    add: boolean;
  };
}

export const initialLogsState: LogsState = {
  logs: [],
  loading: {
    list: false,
    add: false,
  }
}