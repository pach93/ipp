'use strict';

export default function($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      template: '<syllabus></syllabus>'
    });
}
