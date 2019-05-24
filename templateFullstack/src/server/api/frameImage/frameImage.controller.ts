/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/frameImages              ->  index
 * POST    /api/frameImages              ->  create
 * GET     /api/frameImages/:id          ->  show
 * PUT     /api/frameImages/:id          ->  upsert
 * PATCH   /api/frameImages/:id          ->  patch
 * DELETE  /api/frameImages/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as frameImageEvents from './frameImage.events';
import config from '../../config/environment';
import FrameImage from './frameImage.model';

const isConnectedDB = config.mongo.connect;
let FrameImagesData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of frameImage object.
 * @typedef {Object} FrameImage
 * @property {String} name - The name of the frameImage.
 * @property {String} info - Detailed info about the frameImage.
 * @property {boolean} active - Indicates whether the frameImage is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishFrameImageCreated() {
  return function (entity) {
    if (entity) {
      frameImageEvents.FrameImageCreated(entity);
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
 * Creates a controller for FrameImages
 *
 * @class FrameImageController
 */
class FrameImageController {

  /**
   * Creates an instance of FrameImageController.
   * @memberof FrameImageController
   */
  constructor() { }

  /**
   * Gets a list of FrameImages
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {FrameImage[]} The list of available frameImages
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(FrameImagesData);
    }

    return FrameImage.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific frameImage
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {FrameImage} A specific frameImage with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let frameImage: any = FrameImagesData.find(frameImage => frameImage._id === query);
      if (frameImage) {
        return res.status(200).send(frameImage);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return FrameImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new FrameImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the frameImage.
   * @param {String} req.body.info - Detailed info about the frameImage.
   * @param {boolean} req.body.active - Indicates whether the frameImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {FrameImage} The created frameImage
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return FrameImage.create(req.body)
      //.then(publishFrameImageCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing FrameImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the frameImage.
   * @param {String} req.body.info - Detailed info about the frameImage.
   * @param {boolean} req.body.active - Indicates whether the frameImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {FrameImage} The updated frameImage
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return FrameImage.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing FrameImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the frameImage.
   * @param {String} req.body.info - Detailed info about the frameImage.
   * @param {boolean} req.body.active - Indicates whether the frameImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {FrameImage} The updated frameImage
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return FrameImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a FrameImage from the DB
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

    return FrameImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing FrameImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {FrameImage} The updated frameImage
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

export default new FrameImageController();
