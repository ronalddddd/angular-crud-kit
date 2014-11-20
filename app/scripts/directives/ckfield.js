'use strict';

/**
 * @ngdoc directive
 * @name crudKit.directive:ckField
 * @description
 * # ckField
 */
angular.module('crudKit')
  .directive('ckField', ['$http','$compile', 'crudKitConfig',function ($http, $compile, crudKitConfig) {

    var getTemplateUrl = function(type) {
      //console.log(type);
      var templateUrl = '';

      switch(type) {
//        case 'TYPEAHEAD':
//          templateUrl = 'views/ckfield_typeahead.html';
//          break;
        case 'email':
          templateUrl = 'ckfield_email.html';
          break;
        case 'phone':
          templateUrl = 'ckfield_phone.html';
          break;
        case 'textarea':
          templateUrl = 'ckfield_textarea.html';
          break;
        case 'boolean':
          templateUrl = 'ckfield_checkbox.html';
          break;
        case 'date-time':
          templateUrl = 'ckfield_date.html';
          break;
        case 'enum':
          templateUrl = 'ckfield_dropdown.html';
          break;
        case 'hidden':
          templateUrl = 'ckfield_hidden.html';
          break;
        case 'password':
          templateUrl = 'ckfield_password.html';
          break;
        case 'radio':
          templateUrl = 'ckfield_radio.html';
          break;
        case 'integer':
          templateUrl = 'ckfield_number.html';
          break;
//        case 'TEXT':
//        case 'VARCHAR':
        default:
          templateUrl = 'ckfield_textfield.html';
          break;
      }
      return (crudKitConfig.templatesPath || "views/") + templateUrl;
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
      scope.jsonSchema = formController.getScope().schema || null;
      scope.model = formController.getScope().model;
      scope.options = scope.options || {};

      var
        property = (scope.jsonSchema && scope.jsonSchema.properties)? scope.jsonSchema.properties[scope.fieldName] : {},
        options = {
          label: scope.options.label || scope.fieldName,
          placeholder: scope.options.placeholder || "",
          // templateUrl is defined by one of these: 1. custom URL; 2. json schema's property.enum.format 3. property.type
          template: scope.options.template || ( (property.enum)? "enum" : property.format || property.type || "default" )
        };

      scope.title = options.label;
      scope.property = property;
      // Default field value
      scope.model[scope.fieldName] = (property.default)? property.default:null;

      $http.get(getTemplateUrl(options.template)).success(function(data) {
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
        fieldTemplateUrl: '@',
        template: '@',
        options: '=?'
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
  }])  
/**
 * ckBindModel - to convert dynamic model name to ngModel, allow deep model name
 * @param  {[type]} $compile [description]
 * @return {[type]}          [description]
 */
  .directive('ckBindModel',function($compile){
      return{
          compile:function(tEl,tAtr){          
            tEl[0].removeAttribute('ck-bind-model');
              return function(scope){
                tEl[0].setAttribute('ng-model',tAtr.ckBindModel);
                $compile(tEl[0])(scope);                  
              }
          }
      }
  })
;
