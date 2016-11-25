'use strict';
const angular = require('angular');
const ngRoute = require('angular-route');


import routes from './syllabus.routes';

export class SyllabusComponent {
  /*@ngInject*/
  constructor() {
    this.create = function(){
      console.log(this.newSyllabus);
    }
  }
}

export default angular.module('encoreApp.syllabus', [ngRoute])
  .config(routes)
  .component('syllabus', {
    template: require('./syllabus.html'),
    controller: SyllabusComponent,
    controllerAs: 'syllabusCtrl'
  })
  .name;
 