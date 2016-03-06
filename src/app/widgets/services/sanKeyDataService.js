angular.module('dashboardModule').factory('sankeyDataService', function ($http) {

    var getData = function () {
        var url = "api/sankeyData/getSankeyData/";
        return $http.get(url)
            .then(function (result) {
                var sanKeyData = result.data;
                return sanKeyData;
            });
    };

    var currentSankeyDataSet = {};

    var getDataById = function (id) {
        console.log("in angular sankeyDataService");
        var url = "api/sankeyData/getSankeyDataById/";
        var url = url + id;
        console.log("url being sent is: " + url);
        return $http.get(url)
            .then(function (result) {
                var sanKeyData = result.data;
                currentSankeyDataSet = sanKeyData;
                return sanKeyData;
            });
    };
    return {
        getData: getData,
        getDataById: getDataById
    };
});