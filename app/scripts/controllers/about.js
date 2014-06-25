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
                    "type":"string"
                },

                "useful": {
                    "title":"Useful",
                    "type":"boolean",
                    "default": false
                },

                "created": {
                    "title":"Date Created",
                    "format":"date-time"
                }
            },
            required: ["title", "useful", "created"]
        };

        $scope.widgetInstance = {
            title: null,
            useful: false,
            created: new Date()
//            created: "xx123adsa"
        };

        $scope.widgetIsValid = false;
        $scope.$watch("widgetInstance",function(val){
            $scope.validationResult = JSONValidator.validate($scope.widgetInstance, $scope.widgetSchema);
            $scope.widgetIsValid = $scope.validationResult.valid;
        },true);

        $scope.clearErrors = function(){
            console.log("CLEAR...");
            $rootScope.$broadcast('validationReset', $scope.widgetSchema);
        };
    });
