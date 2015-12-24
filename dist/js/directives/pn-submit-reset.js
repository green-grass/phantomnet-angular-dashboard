(function () {

    'use strict';

    var module = angular.module('pnSubmitReset', []);

    module.directive('pnSubmitReset', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {},
            templateUrl: '/assets/templates/pn-submit-reset.html'
        };
    });

})();
