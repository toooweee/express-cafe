import App from './app';
import { connectRedis } from '@/helpers';

const port = 3000;

(async () => {
  const app = new App(port);
  await connectRedis();
  app.listen();
})();
