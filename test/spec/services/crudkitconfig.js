'use strict';

describe('Service: crudKitConfig', function () {

  // load the service's module
  beforeEach(module('crudKit'));

  // instantiate service
  var crudKitConfig;
  beforeEach(inject(function (_crudKitConfig_) {
    crudKitConfig = _crudKitConfig_;
  }));

  it('should do something', function () {
    expect(!!crudKitConfig).toBe(true);
  });

});
