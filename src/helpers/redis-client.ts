import { createClient } from 'redis';
import { config } from '@/helpers/config';
import { logger } from '@/utils';

const url = `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`;

export const redis = createClient({
  url,
});

redis.on('error', (err) => logger.error('[Redis]', err));
redis.on('connect', () => logger.info(`[Redis] connected`));
redis.on('reconnecting', () => logger.debug('[Redis] reconnecting...'));

export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
  }
};

export const disconnectRedis = async () => {
  if (redis.isOpen) {
    await redis.quit();
  }
};
