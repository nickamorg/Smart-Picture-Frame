/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wallSets              ->  index
 * POST    /api/wallSets              ->  create
 * GET     /api/wallSets/:id          ->  show
 * PUT     /api/wallSets/:id          ->  upsert
 * PATCH   /api/wallSets/:id          ->  patch
 * DELETE  /api/wallSets/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as wallSetEvents from './wallSet.events';
import config from '../../config/environment';
import WallSet from './wallSet.model';

const isConnectedDB = config.mongo.connect;
let WallSetsData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of wallSet object.
 * @typedef {Object} WallSet
 * @property {String} name - The name of the wallSet.
 * @property {String} info - Detailed info about the wallSet.
 * @property {boolean} active - Indicates whether the wallSet is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishWallSetCreated() {
  return function (entity) {
    if (entity) {
      wallSetEvents.WallSetCreated(entity);
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
 * Creates a controller for WallSets
 *
 * @class WallSetController
 */
class WallSetController {

  /**
   * Creates an instance of WallSetController.
   * @memberof WallSetController
   */
  constructor() { }

  /**
   * Gets a list of WallSets
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {WallSet[]} The list of available wallSets
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(WallSetsData);
    }

    return WallSet.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific wallSet
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {WallSet} A specific wallSet with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let wallSet: any = WallSetsData.find(wallSet => wallSet._id === query);
      if (wallSet) {
        return res.status(200).send(wallSet);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return WallSet.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new WallSet in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallSet.
   * @param {String} req.body.info - Detailed info about the wallSet.
   * @param {boolean} req.body.active - Indicates whether the wallSet is active.
   * @param {Object} res - http response object to report any issues
   * @return {WallSet} The created wallSet
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return WallSet.create(req.body)
      //.then(publishWallSetCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing WallSet in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallSet.
   * @param {String} req.body.info - Detailed info about the wallSet.
   * @param {boolean} req.body.active - Indicates whether the wallSet is active.
   * @param {Object} res - http response object to report any issues
   * @return {WallSet} The updated wallSet
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return WallSet.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing WallSet in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallSet.
   * @param {String} req.body.info - Detailed info about the wallSet.
   * @param {boolean} req.body.active - Indicates whether the wallSet is active.
   * @param {Object} res - http response object to report any issues
   * @return {WallSet} The updated wallSet
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return WallSet.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a WallSet from the DB
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

    return WallSet.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing WallSet in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {WallSet} The updated wallSet
   */
  public propagateEventToUI(req: Request, res: Response) {
    
    console.log('propagateEventToUI called!');

    let eventType = 'customEventType';
    let event = {
      attribute: 'value'
    };

    //Inform client for the new event 
    let data2String = JSON.stringify(event);
    global.__socketController.broadcastMessage(eventType, data2String);

    res.send("OK!");
    return;
  }
}

export default new WallSetController();
