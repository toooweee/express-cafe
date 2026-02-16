import express from 'express';

class App {
  private app: express.Application;
  private readonly port: number | undefined;

  constructor(port: number) {
    this.app = express();
    this.port = port;
  }

  listen = () => {
    this.app.listen(this.port || 3000, () => {
      console.log(`Server is listening at http://localhost:${this.port}`);
    });
  };
}

export default App;
