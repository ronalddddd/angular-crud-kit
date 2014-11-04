angular-crud-kit
================

AngularJS module to structure your view-models with JSON schemas, build forms, and interact with RESTful API services

Quick Start
================

- Install via bower:

        bower install crud-kit


- Include the scripts:

        <script src="bower_components/crud-kit/dist/scripts/crudKit.js"></script>


- Add to crudKit your angular module's dependencies:

        var myApp = angular.module('crudKit.demo', ['crudKit']);


- Add a JSON Schema (for every model you want to define)

        myApp.config(['crudKitConfigProvider', function (crudKitConfigProvider) {
              crudKitConfigProvider.addSchema('Widget', {
                "$schema":  "http://json-schema.org/draft-04/schema",
                "title":    "ACME Widget",
                "description": "Some description of the widget.",
                "type":     "object",
                "properties": {
                    "title": {
                        "title":"Title",
                        "description":"Something to describe this Widget",
                        "type":["string", "null"]
                    },

                    "email": {
                        "title":"Email",
                        "type":["string", "null"],
                        "format":"email"
                    },

                    "someInt":{
                        "title":"Some Integer",
                        "type": ['integer', 'null'],
                        "default": 150
                    },

                    "useful": {
                        "title":"Useful",
                        "type":"boolean",
                        "default": false
                    },

                    "context_id": {
                        "title":"Context",
                        "enum":['Chinese','English']
                    },

                    "created": {
                        "title":"Date Created",
                        "format":"date-time"
                    },

                    "summary": {
                        "title":"Summary",
                        "type":"string",
                        "format":"textarea"
                    }
                },
                "required": ["title", "summary","context_id"]
            }
        });


- Start building forms:

        <!--controller example -->
        <script>
            angular.module('crudKit.demo')
                .controller('AboutCtrl', function ($scope, $rootScope, $filter, JsonApi, JSONValidator, crudKitConfig) {
                    $scope.api = JsonApi;
                    $scope.widgetSchema = crudKitConfig.schemas.Widget;

                    $scope.widgetInstance = {
                      title: "TEST TITLE"
                    };

                    $scope.saveWidget =function(model, next){
                        console.debug(model);
                        next(null, model);
                    };
                });
        </script>
        <!--ckForm Directive Example-->
        <ck-form name="widgetForm" schema="widgetSchema" model="widgetInstance" on-save="saveWidget($model, $next)" debug="true">
            <div class="col-sm-6">
                <ck-field field-name="title"></ck-field>
                <ck-field field-name="summary"></ck-field>
            </div>
            <div class="col-sm-6">
                <ck-field field-name="created"></ck-field>
                <ck-field field-name="context_id"></ck-field>
                <!--Use a custom field template-->
                <ck-field field-name="email" field-template-url="views/ckfield_email.html"></ck-field>
            </div>
        </ck-form>


- Interacting with RESTful resources:

        coming soon.

Demo
==========
After installing with bower, browse to `bower_components/crud-kit/dist/index.html`

TO DOs
==========
- Simple CRUD methods for JsonApi service.
- Default CRUD actions for ckForms using JsonApi service.
- ckGrid directive.
- Implement more default input templates.
- Tests (i know i know...)
