'use strict';

/**
 * @ngdoc service
 * @name crudKitApp.Jsonapi
 * @description
 * # Jsonapi
 * Service in the crudKitApp.
 */
angular.module('crudKit')
  .service('JsonApi', ['crudKitConfig','$q', '$rootScope', function JsonApi(config, $q, $rootScope) {
    var
      api = this,
      broadcastApiEvent = function(resourceName, eventName, data){
        $rootScope.$broadcast(resourceName.name + "_" + eventName, data);
      };

    api.ready = $q.defer();

    switch(config.schemaType){
      case "json-schema":
        throw new Error("API service for json-schema not implemented.");
        break;

    /** Create local Models based on remote swagger spec (using swagger-js lib) **/
      case "swagger":
        var
          defaultApiMethodNames = ['count', 'create', 'deleteById', 'exists', 'find', 'findById', 'findOne', 'updateAll', 'upsert'],
          makeDefaultApiMethods = function(apiName){
            var
              swaggerResource = api.swagger.apis[apiName],
              defaultApiMethods = {};

            for (var k in swaggerResource){
              var element = swaggerResource[k];
              if (typeof element === 'function'){
                var
                  kExploded = k.split("_"),
                  methodName = kExploded.pop();
                if (defaultApiMethodNames.indexOf(methodName)){
                  // Create the actual method, e.g. count()
                  (function(thisMethodName, thisApiName){
                    defaultApiMethods[thisMethodName] = function(args, successCb, errorCb){
                      successCb = successCb || function(res){};
                      errorCb = errorCb || function(err){};

                      // Wrap swagger api call with promise
                      var apiMethodPromise = $q.defer();
                      this(args, function(res){
                        // Success CB
                        apiMethodPromise.resolve(res);
                        successCb(res);
                        broadcastApiEvent(thisApiName, "after_" + thisMethodName, res);
                      }, function(err){
                        // Error CB
                        apiMethodPromise.reject(err);
                        broadcastApiEvent(thisApiName, thisMethodName + "_error", res);
                        errorCb(err);
                      });

                      return apiMethodPromise.promise;
                    }.bind(element);
                  })(methodName, apiName);
                }
              }
            } // end for each potential api method

            return defaultApiMethods;
          };

        api.swaggerUrl = config.schemaUrl;
        api.swagger = new SwaggerApi({
          url: api.swaggerUrl,
          success: function(){
            if(api.swagger.ready === true){
              api.swagger.apisArray.forEach(function createApiModel(swaggerApi){
                var apiName = swaggerApi.name;
                api[apiName] = makeDefaultApiMethods(apiName);
              });

              console.info("SwaggerApi ready.");
              api.ready.resolve(api);
              api._isReady = true;
            } else {
              api.ready.reject("Failed to initiate SwaggerApi");
            }
          }
        }); // new SwaggerApi
        break;

      default:
        throw new Error("API service not implemented for this schema type");
    }

    return api;
  }]);