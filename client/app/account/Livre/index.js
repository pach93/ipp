'use strict';

import angular from 'angular';
import LivreController from './Livre.controller';

export default angular.module('encoreApp.Livre', [])
  .controller('LivreController', LivreController)
  .name;