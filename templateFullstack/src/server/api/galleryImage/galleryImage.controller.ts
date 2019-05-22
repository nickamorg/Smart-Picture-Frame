/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/galleryImages              ->  index
 * POST    /api/galleryImages              ->  create
 * GET     /api/galleryImages/:id          ->  show
 * PUT     /api/galleryImages/:id          ->  upsert
 * PATCH   /api/galleryImages/:id          ->  patch
 * DELETE  /api/galleryImages/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as galleryImageEvents from './galleryImage.events';
import config from '../../config/environment';
import GalleryImage from './galleryImage.model';

const isConnectedDB = config.mongo.connect;
let GalleryImagesData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of galleryImage object.
 * @typedef {Object} GalleryImage
 * @property {String} name - The name of the galleryImage.
 * @property {String} info - Detailed info about the galleryImage.
 * @property {boolean} active - Indicates whether the galleryImage is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishGalleryImageCreated() {
  return function (entity) {
    if (entity) {
      galleryImageEvents.GalleryImageCreated(entity);
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
 * Creates a controller for GalleryImages
 *
 * @class GalleryImageController
 */
class GalleryImageController {

  /**
   * Creates an instance of GalleryImageController.
   * @memberof GalleryImageController
   */
  constructor() { }

  /**
   * Gets a list of GalleryImages
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {GalleryImage[]} The list of available galleryImages
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(GalleryImagesData);
    }

    return GalleryImage.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific galleryImage
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {GalleryImage} A specific galleryImage with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let galleryImage: any = GalleryImagesData.find(galleryImage => galleryImage._id === query);
      if (galleryImage) {
        return res.status(200).send(galleryImage);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return GalleryImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new GalleryImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the galleryImage.
   * @param {String} req.body.info - Detailed info about the galleryImage.
   * @param {boolean} req.body.active - Indicates whether the galleryImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {GalleryImage} The created galleryImage
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return GalleryImage.create(req.body)
      //.then(publishGalleryImageCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing GalleryImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the galleryImage.
   * @param {String} req.body.info - Detailed info about the galleryImage.
   * @param {boolean} req.body.active - Indicates whether the galleryImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {GalleryImage} The updated galleryImage
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return GalleryImage.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing GalleryImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the galleryImage.
   * @param {String} req.body.info - Detailed info about the galleryImage.
   * @param {boolean} req.body.active - Indicates whether the galleryImage is active.
   * @param {Object} res - http response object to report any issues
   * @return {GalleryImage} The updated galleryImage
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return GalleryImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a GalleryImage from the DB
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

    return GalleryImage.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing GalleryImage in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {GalleryImage} The updated galleryImage
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

export default new GalleryImageController();
