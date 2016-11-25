'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
Schema = mongoose.Schema;

var SyllabusSchema = new mongoose.Schema({
 academy : String,
 year : Number,
 title : String,
 education : String,
 lecturer : String,
 owner : {
 	type : Schema.ObjectId,
 	ref : 'User'
 }
});

export default mongoose.model('Syllabus', SyllabusSchema);
