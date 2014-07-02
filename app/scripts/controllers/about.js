'use strict';

/**
 * @ngdoc function
 * @name crudKit.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crudKit
 */
angular.module('crudKit')
    .controller('AboutCtrl', function ($scope, JSONValidator, $rootScope, $filter, JsonApi) {
        $scope.api = JsonApi;
        $scope.widgetSchema = {
            "$schema":  "http://json-schema.org/draft-04/schema",
            "title":    "ACME Widget",
            "type":     "object",
            "properties": {
                "title": {
                    "title":"Title",
                    "description":"Something to describe this Widget",
                    "type":["string", "null"]
                },

                "email": {
                    "title":"Email",
                    "type":["string", "null"],
                    "format":"email"
                },

                "someInt":{
                    "title":"Some Integer",
                    "type": ['integer', 'null'],
                    "default": 150
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
            "required": ["title", "summary","context_id"]
        };

        $scope.widgetInstance = {};

        $scope.widgetSchemaStr = $filter('json')($scope.widgetSchema);
        $scope.widgetInstanceStr= $filter('json')($scope.widgetInstance);

        $scope.widgetIsValid = false;

        $scope.validate = function(){
            $scope.validationResult = JSONValidator.validate($scope.widgetInstance, $scope.widgetSchema);
            $scope.widgetIsValid = $scope.validationResult.valid;
        };

        $scope.updateSchema = function(jsonStr){
            $scope.widgetSchema = angular.fromJson(jsonStr);
            console.log($scope.widgetSchema);
        };

        $scope.$watch("widgetSchemaStr",function(val){
            $scope.widgetSchema = angular.fromJson(val);
            console.debug($scope.widgetSchema);
        }, true);

        $scope.$watch("widgetInstanceStr",function(val){
            $scope.widgetInstance = angular.fromJson(val);
            console.debug($scope.widgetInstance);
        }, true);

        $scope.$watch("widgetInstance",function(val){
            $scope.widgetInstanceStr = $filter('json')(val);
            console.debug($scope.widgetInstanceStr);
        }, true);

        $scope.$watch("widgetInstance",function(val){
//            $scope.validationResult = JSONValidator.validate($scope.widgetInstance, $scope.widgetSchema);
//            $scope.widgetIsValid = $scope.validationResult.valid;
        },true);

        /** Example ckFields */
        $scope.exampleFields = '';

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
