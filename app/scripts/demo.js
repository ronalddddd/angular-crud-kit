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
    'crudKit',
    'ui.ace'
  ])
  .config(function ($routeProvider) {
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
  });
