'use strict';

/**
 * @ngdoc service
 * @name crudKitApp.Jsonapi
 * @description
 * # Jsonapi
 * Service in the crudKitApp.
 */
angular.module('crudKit')
  .service('JsonApi', ['crudKitConfig','$q', '$rootScope', '$timeout', function JsonApi(config, $q, $rootScope, $timeout) {
    var
      api = this,
      broadcastApiEvent = function(resourceName, eventName, data){
        $rootScope.$broadcast(resourceName.name + "_" + eventName, data);
      };

    api._d = $q.defer();
    /**
     * Initializes the API according to the schemaType
     * @private
     */
    api._init = function(){
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

                $rootScope.$apply(function(){
                  console.info("SwaggerApi ready.");
                  api._d.resolve(api);
                }); // $rootScope.$apply()
              }
            }
          }); // new SwaggerApi
          break;

        default:
          throw new Error("API service not implemented for this schema type");
      }
    }; // api._init()
    /**
     * Sets an authorization token for all API queries
     * @param keyName
     * @param keyValue
     */
    api.setApiKey = function(keyName, keyValue){
      switch(config.schemaType){
        case "json-schema":
          throw new Error("API key for json-schema not implemented.");
          break;

        case "swagger":
          authorizations.add("apiKey", new ApiKeyAuthorization(keyName,keyValue,"query"));
          break;

        default:
          throw new Error("API key not supported for this schemaType");
      }
    };

    api.ready = api._d.promise;
    api._init();

    return api;
  }]);