angular.module('app').controller('BlsJobsCreatedController',

    function ($scope, $http, $localStorage) {

        $scope.jobsCreated = [];
        var resultSet = [];
        var graphArray = ["Month", "Jobs Created (000)"];

        $scope.init = function () {
            console.log("invoked widget jobs created controller");
            $http.get('api/blsJobs/getJobsCreated').then(function (jobsCreated) {
                resultSet = jobsCreated.data;
                resultSet.unshift(graphArray);
                $localStorage.jobsCreated = resultSet;
                drawGraph(resultSet, "ColumnChart");
            });
        }

        $scope.init();

        $scope.switchChartType = function (widget, chartType) {
            drawGraph(resultSet, chartType);
            //temporary modification for sizing issues with graph type charts
            widget.sizeY = (chartType === 'Table') ? 2 : 1;
            widget.displayFormat = chartType;
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
                    title: 'Adjusted Jobs Created'
                }
            };

            chart1.formatters = {
                number: [{
                    columnNum: 1,
                    pattern: "####"
      }]
            };

            $scope.chart = chart1;
        };


    })