'use strict';

describe('Directive: ckField', function () {

  // load the directive's module
  beforeEach(module('crudKit'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ck-field></ck-field>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the ckField directive');
  }));
});
