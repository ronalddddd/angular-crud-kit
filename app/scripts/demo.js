'use strict';

/**
 * @ngdoc overview
 * @name crudKit.demo
 * @description
 * # crudKit.demo
 *
 * Demo site for crudKit.
 */
angular
    .module('crudKit.demo', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'crudKit'
    ])
    .config(['$routeProvider', 'crudKitConfigProvider', function ($routeProvider, crudKitConfigProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: 'AboutCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        crudKitConfigProvider.addModelSchema('Widget', {
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
                        "default": 150,
                        "format": 'integer'
                    },

                    "someBool": {
                        "title":"Some Boolean",
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
        );

        // Tell crudKit where the form and input templates are located:
        //crudKitConfigProvider.set('templatesPath','http://localhost:1234/');
    }]);

