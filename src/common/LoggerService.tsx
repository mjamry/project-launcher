import { Log, LogLevel } from './Log';
import { Nullable } from './Nullable';
import useConsoleLog from './ConsoleLog';

type Exception = {
  message: string,
  stack: string,
};

type DebugData = Nullable<object | string>;

type ILoggerService = {
  error: (msg: string, ex?: Exception) => void;
  warning: (msg: string) => void;
  info: (msg: string) => void;
  debug: (msg: string, data?: DebugData) => void;
};

const useLoggerService = (prefix: string): ILoggerService => {
  const loggers = [useConsoleLog()];
  const userID = 0;

  const generateLog = (level: LogLevel, message: string, data?: DebugData) => new Log(
    userID,
    new Date().toISOString(),
    level,
    message,
    data,
    prefix,
  );

  const error = (message: string, exception?: Exception) => {
    const logEntry = generateLog(LogLevel.error, message, exception);
    loggers.forEach((logger) => {
      logger.error(logEntry);
    });
  };

  const warning = (message: string) => {
    const logEntry = generateLog(LogLevel.warning, message);

    loggers.forEach((logger) => {
      logger.warning(logEntry);
    });
  };

  const info = (message: string) => {
    const logEntry = generateLog(LogLevel.info, message);

    loggers.forEach((logger) => {
      logger.info(logEntry);
    });
  };

  const debug = (message: string, data?: DebugData) => {
    const logEntry = generateLog(LogLevel.debug, message, data);

    loggers.forEach((logger) => {
      logger.debug(logEntry);
    });
  };

  return {
    error,
    warning,
    info,
    debug,
  };
};

export default useLoggerService;
