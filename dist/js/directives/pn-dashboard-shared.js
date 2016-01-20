(function () {

    'use strict';

    var DEFAULT_EVENT_NAMESPACE = '.dashboardshared';

    var module = angular.module('pnDashboardShared');

    module.directive('pnCheckboxInput', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                inline: '&',
                label: '@',
                ngModel: '='
            },
            templateUrl: '/assets/templates/pn-checkbox-input.html'
        };
    });

    module.directive('pnLoading', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {},
            templateUrl: '/assets/templates/pn-loading.html'
        };
    });

    module.directive('pnErrors', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                position: '@',
                closeLable: '@',
                message: '&',
                errors: '&',
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

            var accessor = scope.accessor();
            if (accessor) {
                accessor.show = function () {
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
                accessor: '&',
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

    // It was decided for 1.3 that ng-trasclude would not pull scope from the directive.
    // Use this work around.
    // https://github.com/angular/angular.js/issues/7874#issuecomment-53450394
    module
        .config(function ($provide) {
            $provide.decorator('ngTranscludeDirective', ['$delegate', function ($delegate) {
                // Remove the original directive
                $delegate.shift();
                return $delegate;
            }]);
        })
        .directive('ngTransclude', function () {
            return {
                restrict: 'EAC',
                link: function ($scope, $element, $attrs, controller, $transclude) {
                    if (!$transclude) {
                        throw minErr('ngTransclude')('orphan',
                         'Illegal use of ngTransclude directive in the template! ' +
                         'No parent directive that requires a transclusion found. ' +
                         'Element: {0}',
                         startingTag($element));
                    }

                    var iScopeType = $attrs['ngTransclude'] || 'sibling';

                    switch (iScopeType) {
                        case 'sibling':
                            $transclude(function (clone) {
                                $element.empty();
                                $element.append(clone);
                            });
                            break;
                        case 'parent':
                            $transclude($scope, function (clone) {
                                $element.empty();
                                $element.append(clone);
                            });
                            break;
                        case 'child':
                            var iChildScope = $scope.$new();
                            $transclude(iChildScope, function (clone) {
                                $element.empty();
                                $element.append(clone);
                                $element.on('$destroy', function () {
                                    iChildScope.$destroy();
                                });
                            });
                            break;
                    }
                }
            }
        });

})();
