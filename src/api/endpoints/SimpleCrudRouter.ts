import {Router, Request, Response, NextFunction} from 'express';
import {crud} from "../../db/crud";
import {log} from '../../logger/logger';

export class SimpleCrudRouter {
  router: Router;


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get('/:resource', this.getAll);
    this.router.get('/:resource/:id', this.getOne);
    this.router.post('/:resource', this.create);
  }

  /**
   * Initialize the CrudRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
   * CREATE one resource
   */
  public create(req: Request, res: Response, next: NextFunction) {

    const resource = req.body;
    const resourceName = req.params.resource;

    log.info(resource);

    crud.create(resource, resourceName, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "Server error",
          status: res.status
        })
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data
            })
      }
    })

  }



  /**
   * GET one resource by id
   */
  public getOne(req: Request, res: Response, next: NextFunction) {
    const resourceId = req.params.id;
    const resourceName = req.params.resource;

    crud.read(resourceId, resourceName, (err, data) => {
      if (err) {
        res.status(500).send({
          message: "Server error",
          status: res.status
        })
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data
            })
      }
    });
  }

  /* somehow not working
  private responseCallback(res) {
    return (err, data) => {
      if (err) {
        res.status(500).send({
          message: "Server error",
          status: res.status
        })
      } else {
        res.status(200)
            .send({
              message: 'Success',
              status: res.status,
              data
            })
      }
    }
  }*/


  /**
   * GET all Resources.
   */
  public getAll(req: Request, res: Response, next: NextFunction) {
    // not implemented
  }


}

// Create the CrudRouter, and export its configured Express.Router
const intialRouter = new SimpleCrudRouter();
intialRouter.init();

export const simpleCrudRouter = intialRouter.router;