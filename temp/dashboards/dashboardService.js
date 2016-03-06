'use strict';

angular.module('app').service('DashboardService', function () {

    this.dashboardOfFocus = null;

    this.setDashboardOfFocus = function (dashboard) {
        this.dashboardOfFocus = dashboard;
    };

    this.getDashboardOfFocus = function () {
        var targetDashboard = this.dashboardOfFocus;
        return targetDashboard;
    }
});