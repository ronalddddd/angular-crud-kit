'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckField
 * @description
 * # ckField
 */
angular.module('crudKit')
  .directive('ckField', function ($http, $compile) {

    var getTemplateUrl = function(type) {
      var templateUrl = '';

      switch(type) {
//        case 'TYPEAHEAD':
//          templateUrl = 'views/directive-templates/ckfield/typeahead.html';
//          break;
        case 'email':
          templateUrl = 'views/directive-templates/ckfield/email.html';
          break;
        case 'phone':
          templateUrl = 'views/directive-templates/ckfield/phone.html';
          break;
        case 'textarea':
          templateUrl = 'views/directive-templates/ckfield/textarea.html';
          break;
        case 'boolean':
          templateUrl = 'views/directive-templates/ckfield/checkbox.html';
          break;
        case 'date-time':
          templateUrl = 'views/directive-templates/ckfield/date.html';
          break;
        case 'enum':
          templateUrl = 'views/directive-templates/ckfield/dropdown.html';
          break;
        case 'hidden':
          templateUrl = 'views/directive-templates/ckfield/hidden.html';
          break;
        case 'password':
          templateUrl = 'views/directive-templates/ckfield/password.html';
          break;
        case 'radio':
          templateUrl = 'views/directive-templates/ckfield/radio.html';
          break;
//        case 'TEXT':
//        case 'VARCHAR':
        default:
          templateUrl = 'views/directive-templates/ckfield/textfield.html';
          break;
      }
      return templateUrl;
    };

    var controller = function($scope){
//      $scope.api = api;
      $scope.err = null;

      /** Type-specific methods */
      switch($scope.type){
//        case 'TYPEAHEAD':
//          $scope.typeaheadSelect = function(item){
//            $scope.selectedItem = item;
//            $scope.selectedItemDisplayStr = item[api[$scope.field.field_references].meta.display_field];
//          }
//          // initial associated model data
//          if ($scope.model[$scope.field.field_key]){
//            api[$scope.field.field_references].load($scope.model[$scope.field.field_key]).then(
//              function(res){
//                $scope.typeaheadSelect(res);
//              }
//            );
//          }
//          break;
        default:
          break;
      }

      $scope.$on('validationReset', function(event, schema){
        if($scope.jsonSchema === schema){
          console.debug("EVENT: validationReset");
          $scope.err = null;
        }
      });

      $scope.$on('validationError',function(event, err){
         console.debug(err);
         if(err.dataPath === "/"+$scope.fieldName){
             $scope.err = err;
         }
      });

    };

    var linker = function(scope, element) {
      var property = scope.jsonSchema.properties[scope.fieldName],
          templateUrl = getTemplateUrl(property.format || property.type);

      scope.title = property.title || "";

      $http.get(templateUrl).success(function(data) {
        element.html(data);
        $compile(element.contents())(scope);
      });
    };

    return {
//        template: '<div>{{field}}</div>',
      controller: controller,
      restrict: 'E',
      scope: {
        jsonSchema:'=',
        fieldName:'=',
        model:'='
      },
      link: linker
    };
  });
