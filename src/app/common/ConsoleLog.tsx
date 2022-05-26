import { Log } from './Log';

/* eslint-disable no-console */

const styles = {
  error: 'background: red; color white;font-size: 12pt',
  warning: 'background: yellow; color: black; font-size: 11pt;display: block',
  info: 'background: white; color: black',
  debug: 'background: coral; color: black',
};

const useConsoleLog = () => {
  const logContent = (logEntry: Log) => {
    const prefix = logEntry.prefix ? `[${logEntry.prefix}]` : '';
    return `%c[${logEntry.timestamp}][${logEntry.level}]${prefix} ${logEntry.message}`;
  };

  const error = (logEntry: Log) => {
    console.groupCollapsed(logContent(logEntry), styles.error);
    if (logEntry.data) {
      console.log(logEntry.data);
    }
    console.trace();
    console.groupEnd();
  };

  const warning = (logEntry: Log) => {
    console.groupCollapsed(logContent(logEntry), styles.warning);
    console.trace();
    console.groupEnd();
  };

  const info = (logEntry: Log) => {
    console.log(logContent(logEntry), styles.info);
  };

  const debug = (logEntry: Log) => {
    if (logEntry.data) {
      console.groupCollapsed(logContent(logEntry), styles.debug);
      console.log(logEntry.data);
      console.groupEnd();
    } else {
      console.log(logContent(logEntry), styles.debug);
    }
  };

  return {
    error,
    warning,
    info,
    debug,
  };
};

export default useConsoleLog;
