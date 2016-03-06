angular.module('dashboardModule')
    .directive('widgetHeaderPanel', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/widgetHeaderPane.tmpl.html'
        }
    });