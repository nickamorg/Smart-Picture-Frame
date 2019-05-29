/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wallImages              ->  index
 * POST    /api/wallImages              ->  create
 * GET     /api/wallImages/:id          ->  show
 * PUT     /api/wallImages/:id          ->  upsert
 * PATCH   /api/wallImages/:id          ->  patch
 * DELETE  /api/wallImages/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as wallImageEvents from './wallImage.events';
import config from '../../config/environment';
import WallImage from './wallImage.model';

const isConnectedDB = config.mongo.connect;
let WallImagesData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of wallImage object.
 * @typedef {Object} WallImage
 * @property {String} name - The name of the wallImage.
 * @property {String} info - Detailed info about the wallImage.
 * @property {boolean} active - Indicates whether the wallImage is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishWallImageCreated() {
  return function (entity) {
    if (entity) {
      wallImageEvents.WallImageCreated(entity);
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
 * Creates a controller for WallImages
 *
 * @class WallImageController
 */
class WallImageController {

  /**
   * Creates an instance of WallImageController.
   * @memberof WallImageController
   */
  constructor() { }

  /**
   * Gets a list of WallImages
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {WallImage[]} The list of available wallImages
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(WallImagesData);
    }

    return WallImage.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific wallImage
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {WallImage} A specific wallImage with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let wallImage: any = WallImagesData.find(wallImage => wallImage._id === query);
      if (wallImage) {
        return res.status(200).send(wallImage);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return WallImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new WallImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallImage.
   * @param {String} req.body.info - Detailed info about the wallImage.
   * @param {boolean} req.body.active - Indicates whether the wallImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {WallImage} The created wallImage
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return WallImage.create(req.body)
      //.then(publishWallImageCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing WallImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallImage.
   * @param {String} req.body.info - Detailed info about the wallImage.
   * @param {boolean} req.body.active - Indicates whether the wallImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {WallImage} The updated wallImage
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return WallImage.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing WallImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallImage.
   * @param {String} req.body.info - Detailed info about the wallImage.
   * @param {boolean} req.body.active - Indicates whether the wallImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {WallImage} The updated wallImage
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return WallImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a WallImage from the DB
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

    return WallImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing WallImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {WallImage} The updated wallImage
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

    res.send('OK!');
    return;
  }
}

export default new WallImageController();
