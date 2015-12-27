(function () {

    'use strict';

    PN.namespace('PN.AngularDashboard.List');

    PN.AngularDashboard.List.PagedListControllerScope = PN.AngularDashboard.List.ListControllerScope.extend({
        _$timeout: null,

        pageSize: 20,
        pageNumber: 1,
        pageCount: 1,
        maxPageLength: 11,
        showPageJumper: false,
        performSearchTimeoutPromise: null,

        init: function ($scope, factory, $filter, $timeout) {
            this._$timeout = $timeout;
            this._super($scope, factory, $filter);

            $scope.$watch('pageNumber', function (newValue, oldValue) {
                if (newValue !== oldValue) {
                    $scope.showLoading = true;
                    $scope._loadModels();
                    window.scrollTo(0, 0);
                }
            });
        },

        _loadModels: function () {
            this.focusAddFormInput = false;

            var that = this,
                token = new Date().valueOf().toString();

            this._factory.latestToken = token;
            this._factory.query({ token: token, search: this.search, pageNumber: this.pageNumber, pageSize: this.pageSize }, function (models, responseHeaders) {
                var returnedToken = responseHeaders('token');
                if (returnedToken !== that._factory.latestToken) {
                    return;
                }

                that.showLoading = false;
                that.models = models;
                that.totalCount = Number(responseHeaders('total-count'));
                that.filteredCount = Number(responseHeaders('filtered-count'));
                that.pageCount = Math.max(Math.ceil(that.filteredCount / that.pageSize), 1);
                if (that.totalCount === 0) {
                    that.showAddForm = true;
                    that.focusAddFormInput = true;
                }
            });
        },

        _performSearch: function (search) {
            if (this.performSearchTimeoutPromise !== null) {
                this._$timeout.cancel(this.performSearchTimeoutPromise);
            }

            var that = this;
            this.performSearchTimeoutPromise = this._$timeout(function () {
                that.performSearchTimeoutPromise = null;
                that.pageNumber = 1;
                that._loadModels();
            }, 500);
        }
    });

})();
