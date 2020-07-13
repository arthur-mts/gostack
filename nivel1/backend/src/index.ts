import express from 'express';

class App {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.server.listen(3333);
    this.server.get('/', (req: express.Request, res: express.Response) => {
      return res.send('Hello');
    });
  }


}

export default new App();
