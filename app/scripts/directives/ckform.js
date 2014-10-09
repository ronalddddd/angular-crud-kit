'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckForm
 * @description
 * # ckForm
 */
angular.module('crudKit')
  .controller('ckFormCtrl', ['$rootScope','$scope', '$element','JSONValidator', 'JsonApi', function($rootScope,$scope, $element, JSONValidator, JsonApi){
    /** controller defs */
    $scope.master = angular.copy($scope.model);
    $scope.validationResult = null;
//    $scope.fieldElements = [];

    $scope.reset = function(){
      $scope.model = $scope.master;
    };

    $scope.validate = function(){
      console.debug('Validating model..');
      $scope.validationResult = JSONValidator.validate($scope.model, $scope.schema);
      console.debug('Validation Result', $scope.validationResult,toString());
      return $scope.validationResult;
    };

    $scope.save = function(){
      console.debug("ckForm: save()");
      $rootScope.$broadcast('validationReset', $scope.schema);

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

    this.updateModelField = function(key, val){
      $scope.model[key] = val;
    };

//    this.registerFieldElement = function(el){
//      $scope.fieldElements.push(el);
//    };

    $scope.debugForm = function(){
      console.log("form $scope.delete:",$scope.delete);
      console.log("form $scope.name:",$scope.name);
      console.log("form $scope[$scope.name]:",$scope[$scope.name]);
    };

//    $scope.$watch('model',function(val){
//      console.debug("ckForm `%s`: Model prop changed: ",$scope.name, val);
//    },true);

    /** controller init */
  }])
  .directive('ckForm', function (crudKitConfig) {
    return {
      //template: '<div></div>',
      templateUrl: (crudKitConfig.templatesPath || "views/") + 'ckform_form.html',
      controller: 'ckFormCtrl',
      replace: true,
      transclude: 'element',
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
            console.info("FormControl: ",scope.name);
            console.debug(element.contents());
          }
        }
      }
    }
  });
