angular.module('dashboardModule')
    .directive('sankeyHeaderPanel', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/sankeyHeaderPane.tmpl.html'
        }
    });