'use strict';

describe('Component: SyllabusComponent', function() {
  // load the controller's module
  beforeEach(module('encoreApp.syllabus'));

  var SyllabusComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    SyllabusComponent = $componentController('syllabus', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
