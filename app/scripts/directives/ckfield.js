'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckField
 * @description
 * # ckField
 */
angular.module('crudKit')
  .directive('ckField', ['$http','$compile',function ($http, $compile) {

    var getTemplateUrl = function(type) {
      var templateUrl = '';

      switch(type) {
//        case 'TYPEAHEAD':
//          templateUrl = 'views/ckfield_typeahead.html';
//          break;
        case 'email':
          templateUrl = 'views/ckfield_email.html';
          break;
        case 'phone':
          templateUrl = 'views/ckfield_phone.html';
          break;
        case 'textarea':
          templateUrl = 'views/ckfield_textarea.html';
          break;
        case 'boolean':
          templateUrl = 'views/ckfield_checkbox.html';
          break;
        case 'date-time':
          templateUrl = 'views/ckfield_date.html';
          break;
        case 'enum':
          templateUrl = 'views/ckfield_dropdown.html';
          break;
        case 'hidden':
          templateUrl = 'views/ckfield_hidden.html';
          break;
        case 'password':
          templateUrl = 'views/ckfield_password.html';
          break;
        case 'radio':
          templateUrl = 'views/ckfield_radio.html';
          break;
        case 'integer':
          templateUrl = 'views/ckfield_number.html';
          break;
//        case 'TEXT':
//        case 'VARCHAR':
        default:
          templateUrl = 'views/ckfield_textfield.html';
          break;
      }
      return templateUrl;
    };

    var controller = ['$scope',function($scope){
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
        //console.debug("ckField received validationReset event.");
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

      $scope.$watch('model',function(val){
        //console.debug("Field val changed.",$scope.model[$scope.fieldName]);
        $scope.formController.updateModelField($scope.fieldName, $scope.model[$scope.fieldName]);
      },true);

      $scope.$watch('formController.getScope().model',function(val){
        //console.debug(val);
        $scope.model = val;
      },true);
    }];

    var linker = function(scope, element, attr, formController) {
      //console.debug(formController.getScope().schema.properties);
      scope.formController = formController;
      scope.jsonSchema = formController.getScope().schema;
      scope.model = formController.getScope().model;

      console.debug("Creating Field: ", scope.fieldName);
//      console.debug("model: ", scope.model);
      console.debug("custom field template url: ", scope.fieldTemplateUrl);

      var property = scope.jsonSchema.properties[scope.fieldName],
          // templateUrl is defined by one of these: 1. custom URL; 2. json schema's property.enum.format 3. property.type
          templateUrl = scope.fieldTemplateUrl || ( getTemplateUrl((property.enum)? "enum" : property.format || property.type) );

      scope.title = property.title || "";
      scope.property = property;
      // Default field value
      scope.model[scope.fieldName] = (property.default)? property.default:null;

      $http.get(templateUrl).success(function(data) {
        element.html(data);
        $compile(element.contents())(scope);
      });
    };

    return {
//        template: '<div>{{field}}</div>',
      require: '^ckForm',
      controller: controller,
      restrict: 'E',
      scope: {
        fieldName:'@',
        fieldTemplateUrl: '@'
//        jsonSchema:'=',
//        model:'='
      },
      compile: function(tElement, tAttr){

        return {
          post: linker
        }
      }
      //,link: linker
    };
  }]);
