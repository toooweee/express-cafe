import pino, { LoggerOptions } from 'pino';

const isDev = process.env.NODE_ENV === 'development';

const pinoOptions: LoggerOptions = {
  level: isDev ? 'debug' : 'info',
};

if (isDev) {
  pinoOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
    },
  };
}

export const logger = pino(pinoOptions);
