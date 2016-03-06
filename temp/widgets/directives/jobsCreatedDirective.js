angular.module('app')
    .directive('jobsCreatedWidget', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/genericGoogleChart.tmpl.html',
            controller: 'BlsJobsCreatedController'
        }
    });