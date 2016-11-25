'use strict';

var mongoose = require('mongoose');

var catSchema = new mongoose.Schema({
	name : String,
	age : Number,
	color : String
});

export default mongoose.model('Cat', catSchema);

