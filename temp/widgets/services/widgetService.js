'use strict';

angular.module('dashboardModule').service('WidgetService', function ($localStorage) {

    var service = this;

    service.widgetsCollection = [];

    service.setWidgetsCollection = function (widgets) {
        this.widgetsCollection = widgets;
        updateLocalStorage();
    };

    service.getWidgetsCollection = function () {
        return this.widgetsCollection;
    };

    service.addNewWidget = function (widget) {
        this.widgetsCollection.push(widget);
        updateLocalStorage();
    };

    service.clearWidgetsCollection = function () {
        this.widgetsCollection = [];
        updateLocalStorage();
    };

    function updateLocalStorage() {
        $localStorage.widgets = service.widgetsCollection;
        //        console.log("$localStorage: " + JSON.stringify($localStorage.widgets));
    };

});