/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/images              ->  index
 * POST    /api/images              ->  create
 * GET     /api/images/:id          ->  show
 * PUT     /api/images/:id          ->  upsert
 * PATCH   /api/images/:id          ->  patch
 * DELETE  /api/images/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as imageEvents from './image.events';
import config from '../../config/environment';
import Image from './image.model';

const isConnectedDB = config.mongo.connect;
let ImagesData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of image object.
 * @typedef {Object} Image
 * @property {String} name - The name of the image.
 * @property {String} info - Detailed info about the image.
 * @property {boolean} active - Indicates whether the image is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishImageCreated() {
  return function (entity) {
    if (entity) {
      imageEvents.ImageCreated(entity);
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
 * Creates a controller for Images
 *
 * @class ImageController
 */
class ImageController {

  /**
   * Creates an instance of ImageController.
   * @memberof ImageController
   */
  constructor() { }

  /**
   * Gets a list of Images
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Image[]} The list of available images
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(ImagesData);
    }

    return Image.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific image
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Image} A specific image with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let image: any = ImagesData.find(image => image._id === query);
      if (image) {
        return res.status(200).send(image);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return Image.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new Image in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the image.
   * @param {String} req.body.info - Detailed info about the image.
   * @param {boolean} req.body.active - Indicates whether the image is active.
   * @param {Object} res - http response object to report any issues
   * @return {Image} The created image
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return Image.create(req.body)
      //.then(publishImageCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing Image in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the image.
   * @param {String} req.body.info - Detailed info about the image.
   * @param {boolean} req.body.active - Indicates whether the image is active.
   * @param {Object} res - http response object to report any issues
   * @return {Image} The updated image
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Image.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Image in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the image.
   * @param {String} req.body.info - Detailed info about the image.
   * @param {boolean} req.body.active - Indicates whether the image is active.
   * @param {Object} res - http response object to report any issues
   * @return {Image} The updated image
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Image.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a Image from the DB
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

    return Image.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Image in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {Image} The updated image
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

export default new ImageController();
