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
//          templateUrl = 'views/directive_templates/ckfield/typeahead.html';
//          break;
        case 'email':
          templateUrl = 'views/directive_templates/ckfield/email.html';
          break;
        case 'phone':
          templateUrl = 'views/directive_templates/ckfield/phone.html';
          break;
        case 'textarea':
          templateUrl = 'views/directive_templates/ckfield/textarea.html';
          break;
        case 'boolean':
          templateUrl = 'views/directive_templates/ckfield/checkbox.html';
          break;
        case 'date-time':
          templateUrl = 'views/directive_templates/ckfield/date.html';
          break;
        case 'enum':
          templateUrl = 'views/directive_templates/ckfield/dropdown.html';
          break;
        case 'hidden':
          templateUrl = 'views/directive_templates/ckfield/hidden.html';
          break;
        case 'password':
          templateUrl = 'views/directive_templates/ckfield/password.html';
          break;
        case 'radio':
          templateUrl = 'views/directive_templates/ckfield/radio.html';
          break;
        case 'integer':
          templateUrl = 'views/directive_templates/ckfield/number.html';
          break;
//        case 'TEXT':
//        case 'VARCHAR':
        default:
          templateUrl = 'views/directive_templates/ckfield/textfield.html';
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
          console.info("validationReset on field `%s`",$scope.fieldName);
          $scope.err = null;
        }
      });

      $scope.$on('validationError',function(event, err){
        var schemaPath = err.schemaPath.split("/").splice(1),
            propertyName = err.dataPath.split("/").splice(1).pop();

        if (!propertyName && schemaPath.length > 1  && schemaPath[0] === "required"){
          propertyName =  $scope.jsonSchema.required[schemaPath[1]];
        }

        if(propertyName === $scope.fieldName){
          console.info(err);
          $scope.err = err;
        }
      });

    };

    var linker = function(scope, element) {
      var property = scope.jsonSchema.properties[scope.fieldName],
          templateUrl = getTemplateUrl((property.enum)? "enum" : property.format || property.type);

      scope.title = property.title || "";
      scope.property = property;
      scope.model[scope.fieldName] = (property.default)? property.default:null;

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
