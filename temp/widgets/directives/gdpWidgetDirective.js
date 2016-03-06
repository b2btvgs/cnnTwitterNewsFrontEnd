angular.module('dashboardModule')
    .directive('gdpWidget', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/genericGoogleChart.tmpl.html',
            controller: 'BeaGdpController'
        }
    });