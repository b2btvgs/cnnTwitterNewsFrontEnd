angular.module('dashboardModule').controller('PortfolioController',
    function ($scope, $http, $localStorage, $modal) {

        $scope.portfolioAccounts = [];
        var resultSet = [];
        var graphArray = ["Name", "MarketValue", "CashValue"];
        $scope.accountsTotals = {};
        $scope.mule = "the mule";
        $scope.totalJsonValue = "";
        $scope.tempTotals = {};

        $scope.init = function () {
            $http.get('api/portfolio/getPortfolioWrappedArray').then(function (accounts) {
                resultSet = accounts.data;
                $scope.accountsTotals = resultSet.pop();
                $scope.totalJsonValue = JSON.stringify($scope.accountsTotals);
                resultSet.unshift(graphArray);
                $localStorage.portfolioAccounts = resultSet;
                var chartType = "Table";
                setTempTotals(chartType);
                drawGraph(resultSet, chartType);
            });
        };

        $scope.init();

        $scope.switchChartType = function (widget, chartType) {
            console.log("Just invoked switchedChartType() with: " + chartType);
            setTempTotals(chartType);
            drawGraph(resultSet, chartType);
            //temporary modification for sizing issues with graph type charts
            widget.sizeY = (chartType === 'Table') ? 2 : 1;
            $localStorage.widgets = $scope.widgets;
        };

        function setTempTotals(chartType) {
            $scope.tempTotals = (chartType === 'Table') ? $scope.accountsTotals : null;
        };

        function calculatePositionTotals() {
            var totalsRow = [];
            totalsRow.push("Portfolio Totals");
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
            };
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
                    title: 'Portfolio Accounts'
                }
            };

            //            chart1.events.addListener(table, 'select', selectHandler);

            chart1.formatters = {
                number: [{
                    columnNum: 2,
                    pattern: "##,####,###"
      }, {
                    columnNum: 2,
                    pattern: "##,####,###"
      }]
            };

            $scope.chart = chart1;
        };

        //        function editAccounts(widget) {
        //            $modal.open({
        //                scope: $scope,
        //                templateUrl: 'app/widgets/EditAccounts.tmpl.html',
        //            });
        //        };

    })