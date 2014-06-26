'use strict';

/**
 * @ngdoc function
 * @name crudKit.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crudKit
 */
angular.module('crudKit')
  .controller('AboutCtrl', function ($scope, JSONValidator, $rootScope) {
    $scope.widgetSchema = {
      "$schema":  "http://json-schema.org/draft-04/schema",
      "title":    "ACME Widget",
      "type":     "object",
      "properties": {
        "title": {
          "title":"Title",
          "type":["string", "null"]
        },

        "email": {
          "title":"Email",
          "type":["string", "null"],
          "format":"email"
        },

        "someInt":{
          "title":"Some Integer",
          type: ['integer', 'null']
        },

        "useful": {
          "title":"Useful",
          "type":"boolean",
          "default": false
        },

        "context_id": {
          "title":"Context",
          "enum":['tc','sc']
        },

        "created": {
          "title":"Date Created",
          "format":"date-time"
        },

        "summary": {
          "title":"Summary",
          "type":"string",
          "format":"textarea"
        }
      },
      "required": ["title", "summary"]
    };

    $scope.widgetInstance = {
//      title: null,
//      useful: false,
//      created: new Date()
//            created: "xx123adsa"
    };

    $scope.widgetIsValid = false;

    $scope.validate = function(){
      $scope.validationResult = JSONValidator.validate($scope.widgetInstance, $scope.widgetSchema);
      $scope.widgetIsValid = $scope.validationResult.valid;
    };

    $scope.$watch("widgetInstance",function(val){
//            $scope.validationResult = JSONValidator.validate($scope.widgetInstance, $scope.widgetSchema);
//            $scope.widgetIsValid = $scope.validationResult.valid;
    },true);

    $scope.clearErrors = function(){
      console.log("Clearing Errors...");
      $rootScope.$broadcast('validationReset', $scope.widgetSchema);
    };

    $scope.$on('$destroy', function(event, data){
      console.debug("EVENT: $destroy: ",event,data);
    });

    $scope.saveWidget =function(model, next){
      //console.debug(model);
      next(null, model);
    };
  });
