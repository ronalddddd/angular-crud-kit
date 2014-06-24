'use strict';

/**
 * @ngdoc function
 * @name crudKit.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the crudKit
 */
angular.module('crudKit')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
