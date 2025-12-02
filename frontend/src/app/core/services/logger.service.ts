import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export enum LogLevel {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private logs: LogEntry[] = [];
  private readonly maxLogs = 100;

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, data?: any): void {
    this.log(LogLevel.ERROR, message, data);
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const entry: LogEntry = {
      level,
      message,
      data,
      timestamp: new Date(),
    };

    // Keep logs array size manageable
    if (this.logs.length >= this.maxLogs) {
      this.logs.shift();
    }

    this.logs.push(entry);

    // Console output in development only
    if (environment.DEBUG) {
      const style = this.getConsoleStyle(level);
      console.log(`%c[${level}] ${message}`, style, data || '');
    }
  }

  private getConsoleStyle(level: LogLevel): string {
    const styles = {
      [LogLevel.DEBUG]: 'color: #999; font-weight: normal;',
      [LogLevel.INFO]: 'color: #0066cc; font-weight: normal;',
      [LogLevel.WARN]: 'color: #ff9900; font-weight: bold;',
      [LogLevel.ERROR]: 'color: #ff0000; font-weight: bold;',
    };
    return styles[level];
  }

  getLogs(level?: LogLevel): LogEntry[] {
    if (!level) {
      return [...this.logs];
    }
    return this.logs.filter((log) => log.level === level);
  }

  clearLogs(): void {
    this.logs = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }
}
