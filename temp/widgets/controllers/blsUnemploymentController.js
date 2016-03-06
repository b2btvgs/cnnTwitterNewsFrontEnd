angular.module('dashboardModule').controller('BlsUnemploymentController',

    function (WidgetService, $scope, $http, $localStorage) {

        $scope.unemploymentRates = [];
        var resultSet = [];
        var graphArray = ["Month", "Unemployment Rate"];

        $scope.init = function () {
            $http.get('api/blsJobs/GetUnemploymentRates').then(function (unemploymentRates) {
                resultSet = unemploymentRates.data;
                resultSet.unshift(graphArray);
                $localStorage.unemploymentRates = resultSet;
                drawGraph(resultSet, "ColumnChart");
            });
        }

        $scope.init();

        $scope.$on('gridster-item-initialized', function (item) {
            if (resultSet.length <= 0) {
                return
            };
            if (item.displayFormat.length <= 0) {
                return
            };
            drawGraph(resultSet, item.displayFormat);
        })

        $scope.switchChartType = function (widget, chartType) {
            widget.displayFormat = chartType;
            drawGraph(resultSet, chartType);
            //temporary modification for sizing issues with graph type charts
            widget.sizeY = (chartType === 'Table') ? 2 : 1;
            updateWidgetsCollection(widget);
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
                    title: 'Seasonally Adjusted Unemployment Rates'
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

        function updateWidgetsCollection(widget) {
            if (angular.isObject($scope.dashboardOfFocus)) {
                var widgets = WidgetService.getWidgetsCollection();
                for (var i = 0; i < widgets.length; i++) {
                    if ($scope.dashboardOfFocus.id === widgets[i].dashboard) {
                        var currentWidget = widgets[i];
                        if ((widget.type === currentWidget.type) &&
                            (widget.col === currentWidget.col) &&
                            (widget.row === currentWidget.row)) {
                            widgets[i].displayFormat = widget.displayFormat;
                            console.log("updateWidgetsCollection: " + JSON.stringify(widgets[i]));
                            break;
                        }
                    }
                }
                WidgetService.setWidgetsCollection(widgets);
            }
        };

        $scope.clear = function () {
            var revisedWidgetSet = [];
            if (angular.isObject($scope.dashboardOfFocus)) {
                var widgets = WidgetService.getWidgetsCollection();
                for (var i = 0; i < widgets.length; i++) {
                    if ($scope.dashboardOfFocus.id != widgets[i].dashboard) {
                        revisedWidgetSet.push(widgets[i]);
                    }
                }
                WidgetService.setWidgetsCollection(revisedWidgetSet);
            }
        };

    })