/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/wallpapers              ->  index
 * POST    /api/wallpapers              ->  create
 * GET     /api/wallpapers/:id          ->  show
 * PUT     /api/wallpapers/:id          ->  upsert
 * PATCH   /api/wallpapers/:id          ->  patch
 * DELETE  /api/wallpapers/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as wallpaperEvents from './wallpaper.events';
import config from '../../config/environment';
import Wallpaper from './wallpaper.model';

const isConnectedDB = config.mongo.connect;
let WallpapersData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of wallpaper object.
 * @typedef {Object} Wallpaper
 * @property {String} name - The name of the wallpaper.
 * @property {String} info - Detailed info about the wallpaper.
 * @property {boolean} active - Indicates whether the wallpaper is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishWallpaperCreated() {
  return function (entity) {
    if (entity) {
      wallpaperEvents.WallpaperCreated(entity);
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
 * Creates a controller for Wallpapers
 *
 * @class WallpaperController
 */
class WallpaperController {

  /**
   * Creates an instance of WallpaperController.
   * @memberof WallpaperController
   */
  constructor() { }

  /**
   * Gets a list of Wallpapers
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Wallpaper[]} The list of available wallpapers
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(WallpapersData);
    }

    return Wallpaper.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific wallpaper
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Wallpaper} A specific wallpaper with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let wallpaper: any = WallpapersData.find(wallpaper => wallpaper._id === query);
      if (wallpaper) {
        return res.status(200).send(wallpaper);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return Wallpaper.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new Wallpaper in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallpaper.
   * @param {String} req.body.info - Detailed info about the wallpaper.
   * @param {boolean} req.body.active - Indicates whether the wallpaper is active.
   * @param {Object} res - http response object to report any issues
   * @return {Wallpaper} The created wallpaper
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return Wallpaper.create(req.body)
      //.then(publishWallpaperCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing Wallpaper in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallpaper.
   * @param {String} req.body.info - Detailed info about the wallpaper.
   * @param {boolean} req.body.active - Indicates whether the wallpaper is active.
   * @param {Object} res - http response object to report any issues
   * @return {Wallpaper} The updated wallpaper
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Wallpaper.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Wallpaper in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the wallpaper.
   * @param {String} req.body.info - Detailed info about the wallpaper.
   * @param {boolean} req.body.active - Indicates whether the wallpaper is active.
   * @param {Object} res - http response object to report any issues
   * @return {Wallpaper} The updated wallpaper
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Wallpaper.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a Wallpaper from the DB
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

    return Wallpaper.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Wallpaper in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {Wallpaper} The updated wallpaper
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

export default new WallpaperController();
