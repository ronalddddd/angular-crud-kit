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

    // model name map of Schemas
    this.schemas = {};
//    this.schemaType = 'json-schema';
    this.schemaType = 'swagger';
    this.schemaUrl = '/explorer/resources';

    // Public API for configuration
    this.addModelSchema = function (modelName, modelSchema) {
      this.schemas.models[modelName] = modelSchema;
    };

    this.set = function(key, value){
      this[key] = value;
    };

    // Method for instantiating
    this.$get = function () {
      return this;
    };
  });
