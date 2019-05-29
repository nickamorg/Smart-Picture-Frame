/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/frames              ->  index
 * POST    /api/frames              ->  create
 * GET     /api/frames/:id          ->  show
 * PUT     /api/frames/:id          ->  upsert
 * PATCH   /api/frames/:id          ->  patch
 * DELETE  /api/frames/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as frameEvents from './frame.events';
import config from '../../config/environment';
import Frame from './frame.model';

const isConnectedDB = config.mongo.connect;
let FramesData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of frame object.
 * @typedef {Object} Frame
 * @property {String} name - The name of the frame.
 * @property {String} info - Detailed info about the frame.
 * @property {boolean} active - Indicates whether the frame is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishFrameCreated() {
  return function (entity) {
    if (entity) {
      frameEvents.FrameCreated(entity);
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
 * Creates a controller for Frames
 *
 * @class FrameController
 */
class FrameController {

  /**
   * Creates an instance of FrameController.
   * @memberof FrameController
   */
  constructor() { }

  /**
   * Gets a list of Frames
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Frame[]} The list of available frames
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(FramesData);
    }

    return Frame.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific frame
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Frame} A specific frame with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let frame: any = FramesData.find(frame => frame._id === query);
      if (frame) {
        return res.status(200).send(frame);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return Frame.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new Frame in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the frame.
   * @param {String} req.body.info - Detailed info about the frame.
   * @param {boolean} req.body.active - Indicates whether the frame is active.
   * @param {Object} res - http response object to report any issues
   * @return {Frame} The created frame
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return Frame.create(req.body)
      //.then(publishFrameCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing Frame in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the frame.
   * @param {String} req.body.info - Detailed info about the frame.
   * @param {boolean} req.body.active - Indicates whether the frame is active.
   * @param {Object} res - http response object to report any issues
   * @return {Frame} The updated frame
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Frame.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Frame in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the frame.
   * @param {String} req.body.info - Detailed info about the frame.
   * @param {boolean} req.body.active - Indicates whether the frame is active.
   * @param {Object} res - http response object to report any issues
   * @return {Frame} The updated frame
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Frame.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a Frame from the DB
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

    return Frame.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Frame in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {Frame} The updated frame
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

export default new FrameController();
