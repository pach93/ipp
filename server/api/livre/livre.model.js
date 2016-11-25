'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
Schema = mongoose.Schema;

var LivreSchema = new mongoose.Schema({
  titre : String,
  auteur : String,
  editeur : String,
  owner : {
  	type : Schema.ObjectId,
  	ref : 'User'
  }
});

export default mongoose.model('Livre', LivreSchema);
