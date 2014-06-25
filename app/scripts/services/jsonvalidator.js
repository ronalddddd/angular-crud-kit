'use strict';

/**
 * @ngdoc service
 * @name crudKitApp.JSONValidator
 * @description
 * # JSONValidator
 * Service in the crudKitApp.
 */
angular.module('crudKit')
    .service('JSONValidator', function JSONValidator($rootScope) {
        // AngularJS will instantiate a singleton by calling "new" on this function
        if (!tv4){
            throw new Error("tv4 is required. https://github.com/geraintluff/tv4");
        } else {
            /** custom format validators */
            tv4.addFormat('date-time', function(data, schema){
                return (angular.isDate(data))? null:'Must be a Date';
            });

            return {
                validate: function(data, schema){
                    var res = tv4.validateMultiple(data, schema);

                    res.errors.forEach(function(err){
                        $rootScope.$broadcast('validationError', err);
                    });

                    return res;
                }
            }
        }

    });