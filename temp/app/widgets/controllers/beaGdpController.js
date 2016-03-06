angular.module('dashboardModule').controller('BeaGdpController',
    function ($scope, $http, $localStorage) {

        $scope.gdpRates = [];
        var resultSet = [];
        var graphArray = ["Quarter", "GDP Pct Change"];

        $scope.init = function () {
            $http.get('api/beaGdp/getGdpRates').then(function (gdpRates) {
                resultSet = gdpRates.data;
                resultSet.unshift(graphArray);
                $localStorage.gdpRates = resultSet;
                drawGraph(resultSet, "ColumnChart");
            });
        }

        $scope.init();

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
    })