'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

import Cat from './cat.model';


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

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

export function create(req, res){
    Cat.createAsync(req.body)
    .then(respondWithResult(res))
    .catch(handleError(res));

};

export function getAll(req, res) {
  return Cat.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export function getById(req, res) {
  return Cat.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export function update(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
 Cat.findOneAndUpdateAsync(req.params.id, req.body, {new : true})
    .then(respondWithResult(res))
    .catch(handleError(res));
};

export function deleteCat(req, res) {
  Cat.findOneAndRemoveAsync(req.params.id)
    .then(function(){
    	res.status(204).end();
    })
    .catch(handleError(res));
};
