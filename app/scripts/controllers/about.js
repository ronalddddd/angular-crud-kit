'use strict';

/**
 * @ngdoc function
 * @name crudKit.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the crudKit
 */
angular.module('crudKit')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
