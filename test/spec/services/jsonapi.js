'use strict';

describe('Service: Jsonapi', function () {

  // load the service's module
  beforeEach(module('crudKitApp'));

  // instantiate service
  var Jsonapi;
  beforeEach(inject(function (_Jsonapi_) {
    Jsonapi = _Jsonapi_;
  }));

  it('should do something', function () {
    expect(!!Jsonapi).toBe(true);
  });

});
