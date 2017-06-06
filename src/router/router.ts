import * as express from 'express';
import {middleware} from './middleware';
import {welcomeHtmlRouter} from './endpoints/welcome-html-router';
import {loginRouter} from './endpoints/login-router';
import {simpleCrudRouter} from './endpoints/simple-crud-router';
import {userRouter} from './endpoints/user-router';

// Creates and configures an ExpressJS web server.
class Router {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    middleware.addBodyParser(this.express);
    this.routes();
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    const router = express.Router();
    // placeholder route handler

    this.express.use('/', express.static('../frontend/dist'));

    /*
    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
    */

    this.express.use('/welcome', welcomeHtmlRouter);

    // API
    this.express.use('/api/v1/', loginRouter);
    this.express.use('/api/v1/', userRouter);

    // The simpleCrudRouter one should stay last, since it covers quite a broad range of requests and if it's moved above
    // it will steal away the endpoints of the more specific implementations
    this.express.use('/api/v1/', simpleCrudRouter);


  }

}

export const router = new Router().express;
