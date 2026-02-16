import App from './app';

const port = 3000;

(async () => {
  const app = new App(port);
  app.listen();
})();
