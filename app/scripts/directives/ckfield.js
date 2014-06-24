'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckField
 * @description
 * # ckField
 */
angular.module('crudKit')
  .directive('ckField', function ($http, $compile) {

    var getTemplateUrl = function(schemaProperty) {
      var type = schemaProperty.type;
      var templateUrl = '';

      switch(type) {
//        case 'TYPEAHEAD':
//          templateUrl = 'views/directive-templates/ckfield/typeahead.html';
//          break;
        case 'EMAIL':
          templateUrl = 'views/directive-templates/ckfield/email.html';
          break;
        case 'PHONE':
          templateUrl = 'views/directive-templates/ckfield/phone.html';
          break;
        case 'TEXTAREA':
          templateUrl = 'views/directive-templates/ckfield/textarea.html';
          break;
        case 'BOOLEAN':
        case 'TINYINT':
          templateUrl = 'views/directive-templates/ckfield/checkbox.html';
          break;
        case 'DATETIME':
          templateUrl = 'views/directive-templates/ckfield/date.html';
          break;
        case 'ENUM':
          templateUrl = 'views/directive-templates/ckfield/dropdown.html';
          break;
        case 'hidden':
          templateUrl = 'views/directive-templates/ckfield/hidden.html';
          break;
        case 'PASSWORD':
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
      switch($scope.field.field_type){
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

    };

    var linker = function(scope, element) {
      // GET template content from path
      var templateUrl = getTemplateUrl(scope.field, scope.viewModel);
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
        field:'=',
        model:'=',
        viewModel:'='
      },
      link: linker
    };
  });
