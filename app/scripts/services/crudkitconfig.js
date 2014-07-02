'use strict';

/**
 * @ngdoc service
 * @name crudKit.crudKitConfig
 * @description
 * # crudKitConfig
 * Provider in the crudKit.
 */
angular.module('crudKit')
  .provider('crudKitConfig', function () {

    // model name map of JSON Schemas
    this.schemas = {};

    // Public API for configuration
    this.addSchema = function (name, schema) {
      this.schemas[name] = schema;
    };

    // Method for instantiating
    this.$get = function () {
      return this;
    };
  });
