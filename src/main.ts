import App from './app';
import { connectRedis } from '@/helpers';
import { controllers } from '@/di';

const port = 3000;

(async () => {
  const app = new App(port, controllers);
  await connectRedis();
  app.listen();
})();
