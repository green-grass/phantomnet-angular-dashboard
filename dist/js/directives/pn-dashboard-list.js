(function () {

    'use strict';

    var module = angular.module('pnDashboardList', []);

    module.directive('pnListDashhead', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                title: '@',
                subtitle: '@',
                searchPlaceholder: '@',
                searchTerms: '=',
                emptyList: '&',
                toggleAddForm: '&onToggleAddForm'
            },
            templateUrl: '/assets/templates/pn-list-dashhead.html',
            link: function (scope, element, attrs) {
                scope.onSearchKeypress = function (e) {
                    switch (e.keyCode) {
                        case 27:
                            scope.searchTerms = '';
                            break;
                        default:
                            break;
                    }
                };
            }
        };
    });

    module.directive('pnListAddForm', function () {
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            scope: {
                emptyList: '&',
                emptyListMessage: '@',
                submit: '&onSubmit'
            },
            templateUrl: '/assets/templates/pn-list-add-form.html'
        };
    });

    module.directive('pnSearchResultCount', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                count: '&',
                filteredCount: '&',
                zeroMessage: '@',
                singleMessage: '@',
                pluralMessage: '&'
            },
            templateUrl: '/assets/templates/pn-search-result-count.html'
        };
    });

    module.directive('pnPagedSearchResultCount', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                count: '&',
                filteredCount: '&',
                zeroMessage: '@',
                singleMessage: '@',
                pluralMessage: '&',
                pageSize: '=',
                pageNumber: '&',
                pageCount: '&',
                currentPageMessage: '&',
                rightAlign: '&'
            },
            templateUrl: '/assets/templates/pn-paged-search-result-count.html',
            link: function (scope) {
                scope.showPaginationUtilities = false;
            }
        };
    });

    module.directive('pnDropdownPagination', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                pageCount: '&',
                pageNumber: '='
            },
            templateUrl: '/assets/templates/pn-dropdown-pagination.html'
        };
    });

    module.directive('pnButtonsPagination', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                pageCount: '&',
                pageNumber: '=',
                maxPageLength: '&'
            },
            templateUrl: '/assets/templates/pn-buttons-pagination.html',
            link: function (scope) {
                scope.goToPage = function (pageNumber) {
                    scope.pageNumber = pageNumber;
                };
            }
        };
    });

    module.directive('pnCombinedPagination', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                pageCount: '&',
                pageNumber: '=',
                maxPageLength: '&'
            },
            templateUrl: '/assets/templates/pn-combined-pagination.html',
            link: function (scope) {
                scope.showPageJumper = false;
            }
        };
    });

    module.directive('pnFlextableTextInput', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                inputClass: '@',
                placeholder: '@',
                ngModel: '=',
                focusIf: '&'
            },
            templateUrl: '/assets/templates/pn-flextable-text-input.html'
        };
    });

    module.directive('pnFlextableCheckboxInput', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                label: '@',
                ngModel: '='
            },
            templateUrl: '/assets/templates/pn-flextable-checkbox-input.html'
        };
    });

    module.directive('pnFlextableSubmitReset', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                submitIcon: '@'
            },
            templateUrl: '/assets/templates/pn-flextable-submit-reset.html'
        };
    });

    module.directive('pnTableBoolDisplay', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                value: '&'
            },
            templateUrl: '/assets/templates/pn-table-bool-display.html'
        };
    });

    module.directive('pnTableTextInput', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                inputClass: '@',
                placeholder: '@',
                ngModel: '=',
                focusIf: '&'
            },
            templateUrl: '/assets/templates/pn-table-text-input.html'
        };
    });

    module.directive('pnTableCheckboxInput', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '='
            },
            templateUrl: '/assets/templates/pn-table-checkbox-input.html'
        };
    });

    module.directive('pnTableEditDelete', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                edit: '&onEdit',
                'delete': '&onDelete'
            },
            templateUrl: '/assets/templates/pn-table-edit-delete.html'
        };
    });

    module.directive('pnTableUpdateCancel', function () {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                updateIcon: '@',
                update: '&onUpdate',
                cancel: '&onCancel'
            },
            templateUrl: '/assets/templates/pn-table-update-cancel.html'
        };
    });

})();
