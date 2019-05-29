/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/materials              ->  index
 * POST    /api/materials              ->  create
 * GET     /api/materials/:id          ->  show
 * PUT     /api/materials/:id          ->  upsert
 * PATCH   /api/materials/:id          ->  patch
 * DELETE  /api/materials/:id          ->  destroy
 */

import { Request, Response } from 'express';
import * as jsonpatch from 'fast-json-patch';
import * as materialEvents from './material.events';
import config from '../../config/environment';
import Material from './material.model';

const isConnectedDB = config.mongo.connect;
let MaterialsData = require('./data.json');


/*---------------------------------------------------------
 * Start Data Structure Defs
 ---------------------------------------------------------*/

/**
 * Data structure of material object.
 * @typedef {Object} Material
 * @property {String} name - The name of the material.
 * @property {String} info - Detailed info about the material.
 * @property {boolean} active - Indicates whether the material is active.
 */

/*---------------------------------------------------------
 * END Data Structure Defs
 ---------------------------------------------------------*/


/*---------------------------------------------------------
 * BEGIN Helper functions
 ---------------------------------------------------------*/

function publishMaterialCreated() {
  return function (entity) {
    if (entity) {
      materialEvents.MaterialCreated(entity);
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
 * Creates a controller for Materials
 *
 * @class MaterialController
 */
class MaterialController {

  /**
   * Creates an instance of MaterialController.
   * @memberof MaterialController
   */
  constructor() { }

  /**
   * Gets a list of Materials
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Material[]} The list of available materials
   */
  public index(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.send(MaterialsData);
    }

    return Material.find().exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Gets a specific material
   *
   * @param {Object} req - http request object
   * @param {Object} res - http response object to report any issues
   * @return {Material} A specific material with id
   */
  public show(req: Request, res: Response) {
    if (isConnectedDB === false) {
      let query: number = parseInt(req.params.id, 10);
      let material: any = MaterialsData.find(material => material._id === query);
      if (material) {
        return res.status(200).send(material);
      } else {
        return res.sendStatus(404).end();
      }
    }

    return Material.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Creates a new Material in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the material.
   * @param {String} req.body.info - Detailed info about the material.
   * @param {boolean} req.body.active - Indicates whether the material is active.
   * @param {Object} res - http response object to report any issues
   * @return {Material} The created material
   */
  public create(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    // global.__socketController.sendMessage("", "", "asdfa")

    return Material.create(req.body)
      //.then(publishMaterialCreated())
      .then(respondWithResult(res, 201))
      .catch(handleError(res, 500));
  }

  /**
   * Upserts an existing Material in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the material.
   * @param {String} req.body.info - Detailed info about the material.
   * @param {boolean} req.body.active - Indicates whether the material is active.
   * @param {Object} res - http response object to report any issues
   * @return {Material} The updated material
   */
  public upsert(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Material.findOneAndUpdate(
      { _id: req.params.id },
      req.body, { new: true, upsert: true, setDefaultsOnInsert: true, runValidators: true }
    ).exec()
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Material in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.name - The name of the material.
   * @param {String} req.body.info - Detailed info about the material.
   * @param {boolean} req.body.active - Indicates whether the material is active.
   * @param {Object} res - http response object to report any issues
   * @return {Material} The updated material
   */
  public patch(req: Request, res: Response) {
    if (isConnectedDB === false) {
      return res.sendStatus(400).end();
    }

    if (req.body._id) {
      delete req.body._id;
    }
    return Material.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(patchUpdates(req.body))
      .then(respondWithResult(res, 200))
      .catch(handleError(res, 500));
  }

  /**
   * Deletes a Material from the DB
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

    return Material.findById(req.params.id).exec()
      .then(handleEntityNotFound(res))
      .then(removeEntity(res))
      .catch(handleError(res, 500));
  }

  /**
   * Updates an existing Material in the DB
   *
   * @export
   * @param {Object} req - http request object
   * @param {String} req.body.attribute - The name of the attribute.
   * @param {String} req.body.value - The value of the attribute.
   * @param {Object} res - http response object to report any issues
   * @return {Material} The updated material
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

export default new MaterialController();
