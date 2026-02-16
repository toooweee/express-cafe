import { createClient, RedisClientType } from 'redis';

export const redis = (host: string, port: number) => {
  return createClient({
    url: `redis://${host}:${port}`,
  });
};
