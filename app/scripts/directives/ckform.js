'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckForm
 * @description
 * # ckForm
 */
angular.module('crudKit')
  .controller('ckFormCtrl', ['$scope', '$element','JSONValidator', 'JsonApi', function($scope, $element, JSONValidator, JsonApi){
    /** controller defs */
    $scope.master = angular.copy($scope.model);
    $scope.validationResult = null;
    $scope.fieldElements = [];

    $scope.reset = function(){
      $scope.model = $scope.master;
    };

    $scope.validate = function(){
      $scope.validationResult = JSONValidator.validate($scope.model, $scope.schema);
      return $scope.validationResult;
    };

    $scope.save = function(){
      console.debug("ckForm: save()");
      $scope.$broadcast('validationReset', $scope.schema);

      if ($scope.validate().valid){
        console.debug("ckForm: calling onSave");
        $scope.onSave({
          '$model': $scope.model,
          '$next': function(err, savedModel){
            if(err){
              console.error(err);
            } else {
              $scope.model = savedModel || $scope.model;
              $scope.master = angular.copy($scope.model);
              console.debug("ckForm: onSave result: ",savedModel);
            }
          }
        }); // TODO handle save handler's return? promise? or?
      } else {
        // validation failed
      }
    };

    $scope.delete = function(){
      throw new Error("Not implemented"); // TODO
    };

    this.getScope = function(){
      return $scope;
    };

    $scope.debugForm = function(){
      console.log("form $scope.delete:",$scope.delete);
      console.log("form $scope.name:",$scope.name);
      console.log("form $scope[$scope.name]:",$scope[$scope.name]);
    };

    /** controller init */
  }])
  .directive('ckForm', function ($compile) {
    return {
      //template: '<div></div>',
      templateUrl: 'views/ckform_form.html',
      controller: 'ckFormCtrl',
      scope: {
        title:'=',
        description:'=',

        name:"@",
        schema:'=',
        model:'=',

        onSave:'&',
        onDelete:'&',

//        afterSave:'&', // TODO
//        afterDelete:'&', // TODO

        canDelete:'=',
        columns:'=',
        debug:'='
      },
      restrict: 'E',
      compile: function compile(tElement, tAttrs, transclude) {

        return {
          pre: function(scope, element){

          },
          post: function(scope, element, attrs, controllerInstance) {
            console.log("FormControl: ",scope[scope.name]);

            tElement.children().each(function(el){
              console.log(angular.element(element).find('.form-fields').append(el));
            });

            $compile(element.contents())(scope);
          }
        }
      }
    }
  });
