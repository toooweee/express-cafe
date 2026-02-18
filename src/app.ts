import express from 'express';
import cookieParser from 'cookie-parser';
import { IController } from '@/di/types';
import { logger } from '@/infra/utils';

class App {
  private app: express.Application;
  private readonly port: number | undefined;

  constructor(port: number, controllers: IController[]) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares = () => {
    this.app.use(express.json());
    this.app.use(cookieParser());
  };

  private initializeControllers = (controllers: IController[]) => {
    for (const controller of controllers) {
      this.app.use('/api', controller.router);
    }
  };

  listen = () => {
    this.app.listen(this.port || 3000, () => {
      logger.info(`Server is listening at http://localhost:${this.port}`);
    });
  };
}

export default App;
