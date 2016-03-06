angular.module('dashboardModule').controller('TwitterSubjectController', ['$scope', '$http', '$localStorage', 'WidgetService',
    function ($scope, $http, $localStorage, WidgetService) {

        //        var searchString = "q=from%3ACmdr_Hadfield%20%23nasa&result_type=popular";
        var searchString = "q=Wolf%20Blitzer&result_type=popular";
        var apiUrl = "api/twitterSubject/getTwitterSubjects";
        //        var fullApiUrl = apiUrl + "?" + searchString;
        $scope.subjectTweets = [];
        $scope.refreshTweets = refreshTweets;
        $scope.getPositiveTweets = getPositiveTweets;
        $scope.getNegativeTweets = getNegativeTweets;
        $scope.getPopularTweets = getPopularTweets;


        var widgets = WidgetService.widgetsCollection;
        var widget = widgets[widgets.length - 1];
        var uriString = encodeURIComponent(widget.type.trim());
        var twitterResultType = "recent";

        $scope.init = function () {
            getTWeets();
        };

        $scope.init();

        function getTWeets() {
            var queryParams = "q=" + uriString + "&" + "result_type=" + twitterResultType;
            var fullApiUrl = apiUrl + "?" + queryParams;
            console.log("fullApi is: " + fullApiUrl);
            $http.get(fullApiUrl).then(function (tweets) {
                $scope.subjectTweets = tweets.data;
                $localStorage.subjectTweets = $scope.subjectTweets;
            })
        };

        function refreshTweets(widget) {
            twitterResultType = "recent";
            uriString = encodeURIComponent(widget.type.trim());
            console.log("uriString to be refreshed is: " + uriString);
            getTWeets();
        }

        function getPopularTweets(widget) {
            twitterResultType = "popular";
            uriString = encodeURIComponent(widget.type.trim());
            console.log("uriString to be refreshed is: " + uriString);
            getTWeets();
        }

        function getPositiveTweets(widget) {
            twitterResultType = "recent";
            var positiveAttitude = ":)";
            uriString = encodeURIComponent(widget.type.trim());
            uriString = uriString + encodeURIComponent(" ") + positiveAttitude;
            console.log("uriString to be refreshed is: " + uriString);
            getTWeets();
        }

        function getNegativeTweets(widget) {
            twitterResultType = "recent";
            var negativeAttitude = ":(";
            uriString = encodeURIComponent(widget.type.trim());
            uriString = uriString + encodeURIComponent(" ") + negativeAttitude;
            console.log("uriString to be refreshed is: " + uriString);
            getTWeets();
        }


    }]);