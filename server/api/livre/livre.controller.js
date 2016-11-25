/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/livres              ->  index
 * POST    /api/livres              ->  create
 * GET     /api/livres/:id          ->  show
 * PUT     /api/livres/:id          ->  upsert
 * PATCH   /api/livres/:id          ->  patch
 * DELETE  /api/livres/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Livre from './livre.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Livres
export function index(req, res) {
  return Livre.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Livre from the DB
export function show(req, res) {
  return Livre.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Livre in the DB
export function create(req, res) {
  return Livre.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Livre in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Livre.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Livre in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Livre.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Livre from the DB
export function destroy(req, res) {
  return Livre.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
