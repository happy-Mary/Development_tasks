export enum LogType {
  Spend = "Spend",
  Income = "Income",
}

export interface Log {
  title: string;
  date: string;
  amount: number;
  type: LogType;
  categoryId: number;
}