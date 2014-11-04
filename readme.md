angular-crud-kit
================

AngularJS module to structure your view-models with JSON schemas, build forms, and interact with RESTful API services

Features
========
- ck-form and ck-field tags help you structure and reuse form controls.
- (Coming soon) ck-field will automatically choose the correct form control template using swagger-spec.
- JsonApi service manages your api calls, currently supports the [Swagger Specification](https://github.com/swagger-api/swagger-spec).
No need to write your own HTTP requests. SDK for your server's API is generated using [swagger-js](https://github.com/swagger-api/swagger-js). Just configure these settings in your app module config:

        crudKitConfigProvider.set('schemaType', 'swagger');
        crudKitConfigProvider.set('schemaUrl', 'http://api.yourserver.com/explorer/resources');


Quick Start
================

- Install via bower:

        bower install crud-kit


- Include the scripts:

        <script src="bower_components/crud-kit/dist/scripts/crudKit.js"></script>


- Add to crudKit your angular module's dependencies:

        var myApp = angular.module('crudKit.demo', ['crudKit']);


- Configure the schema to use for the api. Also shown is an example of how to wait for api to be ready.

        myApp.config(['crudKitConfigProvider', function ($routeProvider, crudKitConfigProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl',
                    resolve: {
                        JsonApi: function(JsonApi){
                            return JsonApi.ready;
                        }
                    }
                });

            crudKitConfigProvider.set('schemaType', 'swagger');
            crudKitConfigProvider.set('schemaUrl', 'http://api.yourserver.com/explorer/resources');
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
                <ck-field field-name="summary" options="{ template: 'textarea', label: 'Summary' }"></ck-field>
            </div>
        </ck-form>


- Interacting with RESTful resources:

        // some_controller.js
        angular.module('yourApp')
            .controller('SomeCtrl', ['$scope', 'JsonApi', function($scope, JsonApi){
                $scope.save = function(model, cb){
                    JsonApi.ResourceName.upsert(model, cb);
                };
            }]);

Demo
==========
After installing with bower, browse to `bower_components/crud-kit/dist/index.html`

TO DOs
==========
- Update example code
- Cleanup docs with real example code
- ckField auto-detect form control type from swagger-spec.
- Default CRUD actions for ckForms using JsonApi service.
- ckGrid directive.
- Implement more default input templates.
- Tests (i know i know...)
