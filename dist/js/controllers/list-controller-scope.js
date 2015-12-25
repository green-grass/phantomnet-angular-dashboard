(function () {

    'use strict';

    PN.namespace('PN.AngularDashboard.List');

    PN.AngularDashboard.List.ListControllerScope = PN.AngularDashboard.ControllerScope.extend({
        _factory: null,

        locale: {},
        models: [],
        search: '',
        searchFilter: '',
        showAddForm: false,
        focusAddFormInput: true,
        newModel: {},
        editModel: {},
        deleteConfirmationModalAccessor: {},
        deleteConfirmingModel: {},
        errorMessage: '',
        errors: [],

        init: function (scope, factory) {
            this._factory = factory;

            this._super(scope);

            this._updateSearchFilter(scope.search);

            scope.$watch(
                function (scope) { return scope.search; },
                function (newValue, oldValue) { scope._updateSearchFilter(newValue); }
                );

            scope._resetNewModel();
            scope._loadModels();
        },

        __add: function (model) {
            this.focusAddFormInput = false;
            this.clearErrors();

            var that = this,
                newModel = new this._factory(model);

            newModel.$save(function (respond) {
                if (respond.Result.Succeeded) {
                    that.focusAddFormInput = true;
                    that._resetNewModel();
                    that._loadModels();
                } else {
                    that._displayErrors(that.locale.CreateError, respond);
                }
            });
        },

        __edit: function (model) {
            this.editModel = $.extend({}, model);
        },

        __update: function (model, currentModel) {
            this.clearErrors();

            var that = this,
                newModel = new this._factory(model);

            newModel.$save(function (respond) {
                if (respond.Result.Succeeded) {
                    $.extend(currentModel, model);
                    that.editModel = {};
                    that._loadModels();
                } else {
                    that._displayErrors(that.locale.UpdateError, respond);
                }
            });
        },

        __cancelUpdate: function () {
            this.clearErrors();
            this.editModel = {};
        },

        __confirmDelete: function (model) {
            this.deleteConfirmingModel = model;
            this.deleteConfirmationModalAccessor.show();
        },

        __delete: function (model) {
            this.clearErrors();

            var that = this;
            model.$delete(function (respond) {
                if (!respond.Result.Succeeded) {
                    that._displayErrors(that.locale.DeleteError, respond);
                }
                that._loadModels();
            });
        },

        __clearErrors: function () {
            this.errorMessage = '';
            this.errors = [];
        },

        __onEditorKeypress: function (e, model) {
            switch (e.keyCode) {
                case 13:
                    this.update(this.editModel, model);
                    break;
                case 27:
                    this.cancelUpdate();
                    break;
                default:
                    break;
            }
        },

        __onDeleteConfirmationModalClose: function () {
            this.deleteConfirmingModel = {};
        },

        _displayErrors: function (message, respond) {
            this.errorMessage = message;
            this.errors = respond.Result.Errors;
        },

        _loadModels: function () {
            this.focusAddFormInput = false;
            var that = this;
            this._factory.query()
                .$promise.then(function (models) {
                    that.models = models;
                    if (models.length === 0) {
                        that.showAddForm = true;
                        that.focusAddFormInput = true;
                    }
                });
        },

        _updateSearchFilter: function (value) {
            this.searchFilter = value;
        },

        _resetNewModel: function () {
            this.newModel = {};
        }
    });

})();
