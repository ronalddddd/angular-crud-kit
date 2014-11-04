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

    this.set = function(key, value){
      if(key === 'schemas'){
        throw new Error("The key 'schemas' is reserved.");
      } else {
        this[key] = value;
      }
    }

    // Method for instantiating
    this.$get = function () {
      return this;
    };
  });
