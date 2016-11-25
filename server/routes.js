/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
var bodyParse = require('body-parser');


export default function(app) {
  // Insert routes below
  app.use('/api/syllabuses', require('./api/syllabus'));

  app.use('/api/cats', require('./api/cat'));
  app.use('/api/livres', require('./api/livre'));
  app.use('/api/users', require('./api/user'));
  app.use(bodyParse());


  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
