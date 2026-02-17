import express from 'express';
import cookieParser from 'cookie-parser';
import { logger } from '@/utils';

class App {
  private app: express.Application;
  private readonly port: number | undefined;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
  }

  private initializeMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(cookieParser());
  };

  listen = () => {
    this.app.listen(this.port || 3000, () => {
      logger.info(`Server is listening at http://localhost:${this.port}`);
    });
  };
}

export default App;
