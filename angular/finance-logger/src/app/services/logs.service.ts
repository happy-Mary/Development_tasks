import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Log } from '../models/logs';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  readonly baseUrl = "http://localhost:3000/logs";

  constructor(private readonly http: HttpClient) {}

  getLogs() {
    return this.http.get<Log[]>(this.baseUrl);
  }

  getLogById(id: number) {
    return this.http.get<Log>(`${this.baseUrl}/${id}`);
  }

  addLog(log: Log) {
    return this.http.post<Log>(this.baseUrl, log);
  }

  deleteLog(id: string) {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
