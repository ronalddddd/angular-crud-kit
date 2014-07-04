'use strict';

/**
 * @ngdoc function
 * @name crudKit.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crudKit
 */
angular.module('crudKit.demo')
    .controller('AboutCtrl', function ($scope, $rootScope, $filter, JsonApi, JSONValidator, crudKitConfig) {
        $scope.api = JsonApi;
        $scope.widgetSchema = crudKitConfig.schemas.Widget;

        $scope.widgetInstance = {
          title: "TEST TITLE"
        };

        $scope.widgetSchemaStr = $filter('json')($scope.widgetSchema);
        $scope.widgetInstanceStr= $filter('json')($scope.widgetInstance);

        $scope.widgetIsValid = false;

        $scope.validate = function(){
            $scope.validationResult = JSONValidator.validate($scope.widgetInstance, $scope.widgetSchema);
            $scope.widgetIsValid = $scope.validationResult.valid;
        };

        $scope.updateSchema = function(jsonStr){
            $scope.widgetSchema = angular.fromJson(jsonStr);
            //console.log($scope.widgetSchema);
        };

        $scope.clearErrors = function(){
            console.log("Clearing Errors...");
            $rootScope.$broadcast('validationReset', $scope.widgetSchema);
        };

        $scope.$on('$destroy', function(event, data){
            console.debug("EVENT: $destroy: ",event,data);
        });

        $scope.saveWidget =function(model, next){
            console.debug(model);
            next(null, model);
        };


    });
