import { controllers } from '@/di';
import { connectRedis } from '@/infra/helpers';

import App from './app';

const port = 3000;

(async () => {
	const app = new App(port, controllers);
	await connectRedis();
	app.listen();
})();
