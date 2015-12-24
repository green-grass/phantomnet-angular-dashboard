(function () {

    'use strict';

    var module = angular.module('pnListAddForm', []);

    module.directive('pnListAddForm', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                hidden: '=pnHidden',
                emptyList: '=',
                emptyListMessage: '@',
                submit: '&onSubmit'
            },
            templateUrl: '/assets/templates/pn-list-add-form.html'
        };
    });

})();
