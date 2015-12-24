(function () {

    'use strict';

    var DEFAULT_EVENT_NAMESPACE = '.dashboardshared';

    var module = angular.module('pnDashboardShared', []);

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

    module.directive('pnDeleteConfirmation', function () {
        var link = function (scope, element, attrs) {
            var modal = $('#' + scope.id);
            modal.on('hidden.bs.modal' + DEFAULT_EVENT_NAMESPACE, function () {
                scope.close();
            });

            if (scope.accessor) {
                scope.accessor.show = function () {
                    modal.modal('show');
                };
            }

            scope.onKeypress = function (e) {
                switch (e.keyCode) {
                    case 13:
                        modal.modal('hide');
                        scope.confirm();
                        break;
                    default:
                        break;
                }
            };
        };

        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                accessor: '=',
                id: '@',
                closeLabel: '@',
                title: '@',
                deleteLabel: '@',
                cancelLabel: '@',
                confirm: '&onConfirm',
                close: '&onClose'
            },
            templateUrl: '/assets/templates/pn-delete-confirmation.html',
            link: link
        };
    });

})();
