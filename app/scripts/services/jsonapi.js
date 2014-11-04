'use strict';

/**
 * @ngdoc service
 * @name crudKitApp.Jsonapi
 * @description
 * # Jsonapi
 * Service in the crudKitApp.
 */
angular.module('crudKit')
    .service('JsonApi', ['crudKitConfig','Restangular', function JsonApi(config, Restangular) {
        this.Restangular = Restangular;
        this.schemas = config.schemas;
        this.models = {};

        this.test = function(){ console.log("JsonApi Service test(). config: ",config)};
//        this.test = function(){ console.log("JsonApi Service test(). config.schemas: ",config.schemas)};

        /** Register the base URLs in retangular */
        for(var modelName in this.schemas){
            console.debug("Registering json schema: `%s`", modelName);
            this.models[modelName] = {}; // TODO
        }
    }]);