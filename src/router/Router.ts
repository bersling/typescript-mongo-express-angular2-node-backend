import * as express from 'express';
import * as bodyParser from 'body-parser';
import {simpleCrudRouter} from './endpoints/SimpleCrudRouter';
import {middleware} from "./middleware";
import {welcomeHtmlRouter} from "./endpoints/WelcomeHtmlRouter";
import {loginRouter} from "./endpoints/LoginRouter";

// Creates and configures an ExpressJS web server.
class Router {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
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

    // VIEWS
    let router = express.Router();

    this.express.set('view engine', 'ejs');

    // placeholder route handler
    router.get('/', function(req, res) {
      res.render('pages/index');
    });

    this.express.use('/', router);

    this.express.get('/about', function(req, res) {
      res.render('pages/about');
    });




    //API
    this.express.use('/welcome', welcomeHtmlRouter);

    this.express.use('/api/v1/', loginRouter);
    this.express.use('/api/v1/', simpleCrudRouter);

  }

}

export const router = new Router().express;
