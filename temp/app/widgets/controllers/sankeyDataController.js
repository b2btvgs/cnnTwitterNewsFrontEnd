angular.module('dashboardModule').controller('SankeyDataController', ['sankeyDataService', '$scope', '$http', '$localStorage', function (sankeyDataService, $scope, $http, $localStorage) {

    $scope.sankeyData = [];
    $scope.selectedItem = ($scope.sankeyData.length > 0) ? $scope.sankeyData[0] : {};
    $scope.getSankeyData = getSankeyData();
    $scope.getSankeyDataById = getSankeyDataById;
    //    $scope.init = function () {
    //        var id = "emersonSankeyDataSet_02";
    //        var url = "api/sankeyData/getSankeyDataById/";
    //        var url = "api/sankeyData/getSankeyData";
    //        //        var url = url + id;
    //
    //        console.log("url being sent is: " + url);
    //        console.log("here in SankeyDataController.init()");
    //        $http.get(url).then(function (sankeyData) {
    //            resultSet = sankeyData.data;
    //            $scope.sankeyData = resultSet;
    //            $localStorage.sankeyData = resultSet;
    //            //                drawGraph(resultSet, "ColumnChart");
    //            return $scope.sankeyData;
    //        });
    //    };
    //
    //    $scope.init();
    $scope.getSankeyData;

    $scope.init = function () {
        console.log("invoking getSankeyData()");
        //        getSankeyData();
    };

    $scope.init();

    function getSankeyData() {
        var myDataPromise = sankeyDataService.getData();
        myDataPromise.then(function (result) {
            $scope.sankeyData = result;
            $scope.selectedItem = $scope.sankeyData[0];
            console.log("ok I have the data -- sankeyData Id is: " + $scope.sankeyData[0].sankeyId);
            console.log("selectedItem.sankeyId is: " + $scope.selectedItem.sankeyId);
        });
    };

    function getSankeyDataById(sankeyId) {
        var myDataPromise = sankeyDataService.getDataById(sankeyId);
        console.log("sankeyID used is: " + sankeyId);
        myDataPromise.then(function (result) {
            $scope.selectedItem = result;
        });
    };

    $scope.switchChartType = function (widget, chartType) {
        drawGraph(resultSet, chartType);
        //temporary modification for sizing issues with graph type charts
        widget.sizeY = (chartType === 'Table') ? 2 : 1;
    };

    function drawGraph(resultSet, chartType) {
        var chart1 = {};

        var cssClasses = {
            headerRow: 'tblHeaderClass',
            hoverTableRow: 'tblHighlightClass',
            tableCell: 'tblCellClass',
            headerCell: 'tblHeaderCellClass',
            body: 'tblBodyClass',
            font: 'tblFontClass'
        }

        chart1.type = chartType;
        chart1.data = resultSet;

        chart1.options = {
            displayExactValues: true,
            is3D: true,
            allowHtml: true,
            width: '100%',
            height: '425px',
            borderTop: '20px',
            verticalAlign: 'right',
            backgroundColor: 'AliceBlue',
            fontSize: '25px',
            cssClassNames: cssClasses,
            vAxis: {
                title: 'GDP Percent Change by Quarter'
            }
        };

        chart1.formatters = {
            number: [{
                columnNum: 1,
                pattern: "##.00"
      }]
        };

        $scope.chart = chart1;
    };

            }]);