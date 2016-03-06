angular.module('dashboardModule')
    .directive('twitterHeaderPane', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/twitterHeaderPane.tmpl.html'
        }
    });