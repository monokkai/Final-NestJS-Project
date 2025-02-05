import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', 
  format: format.combine(
    format.timestamp(), 
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [

    new transports.Console({
      level: 'debug',
      handleExceptions: true,
      format: format.combine(
        format.colorize(),
        format.simple(),
      ),
    }),
  ],
});
export default logger;

