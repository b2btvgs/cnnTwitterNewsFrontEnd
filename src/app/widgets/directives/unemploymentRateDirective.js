angular.module('app')
    .directive('unemploymentRateWidget', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/genericGoogleChart.tmpl.html',
            controller: 'BlsUnemploymentController'
        }
    });