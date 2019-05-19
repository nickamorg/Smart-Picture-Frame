/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/walls              ->  index
 * POST    /api/walls              ->  create
 * GET     /api/walls/:id          ->  show
 * PUT     /api/walls/:id          ->  upsert
 * PATCH   /api/walls/:id          ->  patch
 * DELETE  /api/walls/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as wallEvents from './wall.events';
import config from '../../config/environment';
import Wall from './wall.model';

const isConnectedDB = config.mongo.connect;
let WallsData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of wall object.
 * @typedef {Object} Wall
 * @property {String} name - The name of the wall.
 * @property {String} info - Detailed info about the wall.
 * @property {boolean} active - Indicates whether the wall is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishWallCreated() {
  return function (entity) {
    if (entity) {
      wallEvents.WallCreated(entity);
    }
    return entity;
  };
}

function respondWithResult(res: Response, statusCode: number) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      jsonpatch.applyPatch(entity, patches, /*validate*/ true);
    } catch (err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res: Response) {
  return function (entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res: Response) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res: Response, statusCode: number) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}

/*---------------------------------------------------------
 * END Helper functions
 ---------------------------------------------------------*/


/**
 * Creates a controller for Walls
 *
 * @class WallController
 */
class WallController {

  /**
   * Creates an instance of WallController.
   * @memberof WallController
   */
  constructor() { }

  /**
   * Gets a list of Walls
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Wall[]} The list of available walls
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(WallsData);
    }

    return Wall.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific wall
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Wall} A specific wall with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let wall: any = WallsData.find(wall => wall._id === query);
      if (wall) {
        return res.status(200).send(wall);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return Wall.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new Wall in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wall.
   * @param {String} req.body.info - Detailed info about the wall.
   * @param {boolean} req.body.active - Indicates whether the wall is active.
   * @param {Object} res - http response object to report any issues
   * @return {Wall} The created wall
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return Wall.create(req.body)
      //.then(publishWallCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing Wall in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wall.
   * @param {String} req.body.info - Detailed info about the wall.
   * @param {boolean} req.body.active - Indicates whether the wall is active.
   * @param {Object} res - http response object to report any issues
   * @return {Wall} The updated wall
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Wall.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Wall in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wall.
   * @param {String} req.body.info - Detailed info about the wall.
   * @param {boolean} req.body.active - Indicates whether the wall is active.
   * @param {Object} res - http response object to report any issues
   * @return {Wall} The updated wall
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Wall.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a Wall from the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return
   */
  public destroy(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    return Wall.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Wall in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {Wall} The updated wall
   */
  public propagateEventToUI(req: Request, res: Response) {
    
    console.log("propagateEventToUI called!");

    let eventType = "customEventType";
    let event = {
      attribute: "value"
    };

    //Inform client for the new event 
    let data2String = JSON.stringify(event);
    global.__socketController.broadcastMessage(eventType, data2String);

    res.send("OK!");
    return;
  }
}

export default new WallController();
