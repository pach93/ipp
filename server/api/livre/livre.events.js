/**
 * Livre model events
 */

'use strict';

import {EventEmitter} from 'events';
import Livre from './livre.model';
var LivreEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LivreEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Livre.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    LivreEvents.emit(event + ':' + doc._id, doc);
    LivreEvents.emit(event, doc);
  };
}

export default LivreEvents;
