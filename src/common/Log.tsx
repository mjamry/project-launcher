import { Nullable } from './Nullable';

enum LogLevel {
  error = 'error',
  warning = 'warning',
  info = 'info',
  debug = 'debug',
}

class Log {
  constructor(
    userId: number,
    timestamp: string,
    level: LogLevel,
    message: string,
    data?: Nullable<object | string>,
    prefix: string = '',
  ) {
    this.userId = userId;
    this.timestamp = timestamp;
    this.level = level;
    this.message = message;
    this.prefix = prefix;
    this.data = data;
  }

  userId;

  timestamp;

  level;

  message;

  prefix;

  data;
}

export { Log, LogLevel };
