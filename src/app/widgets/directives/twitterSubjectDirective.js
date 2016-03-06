angular.module('app')
    .directive('twitterSubjectWidget', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/twitterSubjectTweets.tmpl.html',
            controller: 'TwitterSubjectController'
        }
    })