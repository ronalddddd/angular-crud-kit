'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckForm
 * @description
 * # ckForm
 */
angular.module('crudKit')
  .controller('ckFormCtrl', function($scope, JSONValidator){
    /** controller defs */
    $scope.master = angular.copy($scope.model);
    $scope.validationResult = null;

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

    /** controller init */
  })
  .directive('ckForm', function () {
    return {
      //template: '<div></div>',
      templateUrl: 'views/directive_templates/ckform/form.html',
      controller: 'ckFormCtrl',
      scope: {
        title:'=',
        description:'=',

        name:'=',
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
      link: function postLink(scope, element, attrs) {
        console.log("FormControl: ",scope[scope.name]);

      }
    };
  });
