/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/shapeImages              ->  index
 * POST    /api/shapeImages              ->  create
 * GET     /api/shapeImages/:id          ->  show
 * PUT     /api/shapeImages/:id          ->  upsert
 * PATCH   /api/shapeImages/:id          ->  patch
 * DELETE  /api/shapeImages/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as shapeImageEvents from './shapeImage.events';
import config from '../../config/environment';
import ShapeImage from './shapeImage.model';

const isConnectedDB = config.mongo.connect;
let ShapeImagesData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of shapeImage object.
 * @typedef {Object} ShapeImage
 * @property {String} name - The name of the shapeImage.
 * @property {String} info - Detailed info about the shapeImage.
 * @property {boolean} active - Indicates whether the shapeImage is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishShapeImageCreated() {
  return function (entity) {
    if (entity) {
      shapeImageEvents.ShapeImageCreated(entity);
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
 * Creates a controller for ShapeImages
 *
 * @class ShapeImageController
 */
class ShapeImageController {

  /**
   * Creates an instance of ShapeImageController.
   * @memberof ShapeImageController
   */
  constructor() { }

  /**
   * Gets a list of ShapeImages
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {ShapeImage[]} The list of available shapeImages
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(ShapeImagesData);
    }

    return ShapeImage.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific shapeImage
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {ShapeImage} A specific shapeImage with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let shapeImage: any = ShapeImagesData.find(shapeImage => shapeImage._id === query);
      if (shapeImage) {
        return res.status(200).send(shapeImage);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return ShapeImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new ShapeImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the shapeImage.
   * @param {String} req.body.info - Detailed info about the shapeImage.
   * @param {boolean} req.body.active - Indicates whether the shapeImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {ShapeImage} The created shapeImage
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return ShapeImage.create(req.body)
      //.then(publishShapeImageCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing ShapeImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the shapeImage.
   * @param {String} req.body.info - Detailed info about the shapeImage.
   * @param {boolean} req.body.active - Indicates whether the shapeImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {ShapeImage} The updated shapeImage
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return ShapeImage.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing ShapeImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the shapeImage.
   * @param {String} req.body.info - Detailed info about the shapeImage.
   * @param {boolean} req.body.active - Indicates whether the shapeImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {ShapeImage} The updated shapeImage
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return ShapeImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a ShapeImage from the DB
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

    return ShapeImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing ShapeImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {ShapeImage} The updated shapeImage
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

export default new ShapeImageController();
