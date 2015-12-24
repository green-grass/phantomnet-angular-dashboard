(function () {

    'use strict';

    var module = angular.module('pnListDashhead', []);

    module.directive('pnListDashhead', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                title: '@',
                subtitle: '@',
                searchPlaceholder: '@',
                searchTerms: '=',
                emptyList: '=',
                toggleAddForm: '&onToggleAddForm'
            },
            templateUrl: '/assets/templates/pn-list-dashhead.html'
        };
    });

})();
