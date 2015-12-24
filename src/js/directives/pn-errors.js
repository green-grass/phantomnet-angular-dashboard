(function () {

    'use strict';

    var module = angular.module('pnErrors', []);

    module.directive('pnErrors', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                position: '@',
                closeLable: '@',
                message: '=',
                errors: '=',
                clear: '&onClear'
            },
            templateUrl: '/assets/templates/pn-errors.html'
        };
    });

})();
