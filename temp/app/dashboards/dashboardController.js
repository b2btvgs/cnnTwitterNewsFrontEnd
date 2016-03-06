'use strict';

angular.module('dashboardModule')
    .controller('DashboardController', ['$scope', '$localStorage', 'DashboardService',
                                        'WidgetService', '$modal',

        function ($scope, $localStorage, DashboardService, WidgetService, $modal, $timeout) {

            $scope.widgetTypes = [
                {
                    id: 1006,
                    type: 'GDP',
                    sizeX: 3,
                    sizeY: 1,
                    displayFormat: 'ColumnChart',
                    template: '<gdp-widget></gdp-widget>',
                    dashboard: 1000
                },
                {
                    id: 1007,
                    type: 'Unemployment Rate',
                    sizeX: 3,
                    sizeY: 1,
                    displayFormat: 'ColumnChart',
                    template: '<unEmployment-Rate-widget></unEmployment-Rate-widget>',
                    dashboard: 1000
                },
                {
                    id: 1008,
                    type: 'Jobs Created',
                    sizeX: 3,
                    sizeY: 1,
                    displayFormat: 'ColumnChart',
                    template: '<jobs-created-widget></jobs-created-widget>',
                    dashboard: 1000
                },
                {
                    id: 1009,
                    type: 'GDP Trend',
                    sizeX: 2,
                    sizeY: 1,
                    displayFormat: 'ColumnChart',
                    template: '<gdp-trend-widget></gdp-trend-widget>',
                    dashboard: 1000
                },
                {
                    id: 1010,
                    type: 'Unemployment Trend',
                    sizeX: 2,
                    sizeY: 1,
                    displayFormat: 'ColumnChart',
                    template: '<unemployment-trend-widget></unemployment-trend-widget>',
                    dashboard: 1000
                },
                {
                    id: 1011,
                    type: 'Jobs Created Trend',
                    sizeX: 2,
                    sizeY: 1,
                    displayFormat: 'ColumnChart',
                    template: '<jobs-created-trend-widget></jobs-created-trend-widget>',
                    dashboard: 1000
                },
                {
                    id: 1012,
                    type: 'Portfolio Accounts',
                    sizeX: 3,
                    sizeY: 2,
                    displayFormat: 'Table',
                    template: '<portfolio-accounts-widget></portfolio-accounts-widget>',
                    dashboard: 1000
                },
                {
                    id: 1013,
                    type: 'Portfolio - PieChart',
                    sizeX: 3,
                    sizeY: 1,
                    template: '<portfolio-accounts-widget></portfolio-accounts-widget>',
                    dashboard: 1000
                },
                {
                    id: 1014,
                    type: 'SankeyData',
                    sizeX: 6,
                    sizeY: 3,
                    template: '<sankey-data-widget></sankey-data-widget>',
                    dashboard: 1000
                },
                {
                    id: 1015,
                    type: 'Wolf Blitzer',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                },
                {
                    id: 1016,
                    type: 'Anderson Cooper',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                },
                {
                    id: 1017,
                    type: 'Poppy Harlow',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                },
                {
                    id: 1018,
                    type: 'Erin Burnett',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                },
                {
                    id: 1019,
                    type: 'Fareed Zakaria',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                },
                {
                    id: 1020,
                    type: 'Michael Smerconish',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                },
                {
                    id: 1021,
                    type: 'Jake Tapper',
                    sizeX: 3,
                    sizeY: 2,
                    template: '<twitter-subject-widget></twitter-subject-widget>',
                    dashboard: 1000
                }
            ]

            $scope.dashboards = $localStorage.dashboards || [
                {
                    id: 'CNN',
                    title: "CNN",
                    concept: "Economy dashboard"
                },
                {
                    id: 'News Anchors',
                    title: "Anchors",
                    concept: "Unemployment dashboard"
                },
                {
                    id: 'Daily News Shows',
                    title: "Shows",
                    concept: "Portfolio dashboard"
                }
            ];

            $scope.widgets = WidgetService.getWidgetsCollection();

            function initDashboard() {

                $scope.gridConfig = {
                    columns: 8,
                    pushing: true,
                    floating: true,
                    swapping: true,
                    width: 'auto',
                    colWidth: '280',
                    isMobile: true,
                    rowHeight: 'match',
                    margins: [6, 6],
                    outerMargin: true,
                    defaultSizeX: 1,
                    defaultSizeY: 1,
                    mobileBreakPoint: 600,
                    mobileModeEnabled: true,
                    resizable: {
                        enabled: true,
                        handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
                        start: function (event, $element, widget) {}, // optional callback fired when resize is started,
                        resize: function (event, $element, widget) {}, // optional callback fired when item is resized,
                        stop: function (event, $element, widget) {} // optional callback fired when item is finished resizing
                    },
                    draggable: {
                        enabled: true, // whether dragging items is supported
                        handle: '.box-header', // optional selector for resize handle
                        start: function (event, $element, widget) {}, // optional callback fired when drag is started,
                        drag: function (event, $element, widget) {}, // optional callback fired when item is moved,
                        stop: function (event, $element, widget) {} // optional callback fired when item is finished dragging
                    }
                };
                generateGridsterTiles();
            }

            function generateGridsterTiles() {
                $scope.widgets = $localStorage.widgets || WidgetService.getWidgetsCollection();
                console.log("invoked generateGridsterTiles()")
                if ($localStorage.widgets == null) {
                    WidgetService.clearWidgetsCollection();
                    $scope.widgets = WidgetService.getWidgetsCollection();
                } else {
                    WidgetService.setWidgetsCollection($localStorage.widgets);
                    $scope.widgets = WidgetService.getWidgetsCollection();
                }
            };

            $scope.addNewWidget = function (widget) {
                var newWidget = angular.copy(widget);
                WidgetService.addNewWidget(newWidget);
                $scope.widgets = WidgetService.getWidgetsCollection();
            }

            $scope.CreateTypedWidget = function (widgetTypeId) {
                console.log("CreateTypedWidget() invoked");
                var targetDashboard = DashboardService.getDashboardOfFocus();
                $scope.dashboardOfFocus = (angular.isObject(targetDashboard)) ? targetDashboard : $scope.dashboards[0];
                console.log("DashboardOfFocus is: " + $scope.dashboardOfFocus.title);
                for (var i = 0; i < $scope.widgetTypes.length; i++) {
                    if (widgetTypeId === $scope.widgetTypes[i].id) {
                        var baseWidget = $scope.widgetTypes[i];
                        $scope.widgetTypes[i].displayFormat = "PieChart";
                        var newWidget = angular.copy($scope.widgetTypes[i]);
                        $scope.widgetTypes[i].displayFormat = baseWidget.displayFormat;
                        //                        console.log("newWidget is: " + newWidget.type);
                        newWidget.dashboard = $scope.dashboardOfFocus.id;
                        //                        newWidget.displayFormat = "PieChart";
                        WidgetService.addNewWidget(newWidget);
                        break;
                    }
                }
                $scope.widgets = WidgetService.getWidgetsCollection();
            };

            $scope.selectWidgetType = function (widgetTypeId) {
                for (var i = 0; i < $scope.widgetTypes.count; i++) {
                    if (widgetTypeId === widgetType.id) {
                        WidgetService.addNewWidget({
                            id: widgetType.id,
                            type: widgetType.type,
                            sizeX: widgetType.sizeX,
                            sizeY: widgetType.sizeY,
                            displayFormat: widgetType.displayFormat,
                            template: widgetType.template
                        });
                        break;
                    }
                }
                $scope.widgets = WidgetService.getWidgetsCollection();
            };

            $scope.chooseDashboard = function (dashboard) {
                DashboardService.setDashboardOfFocus(dashboard);
                $scope.dashboardOfFocus = DashboardService.getDashboardOfFocus();
                console.log("localStorage: " + JSON.stringify($localStorage.widgets));
            };

            $scope.createDashboard = function () {
                $modal.open({
                    scope: $scope,
                    templateUrl: 'app/dashboards/NewDashboard.tmpl.html',
                    controller: 'NewDashboardController'
                });
            };

            $scope.$watch('widgets', function () {
                $localStorage.widgets = WidgetService.getWidgetsCollection();
            }, true);

            $scope.$watch('dashboards', function () {
                $localStorage.dashboards = $scope.dashboards;
            }, true);

            $scope.init = function () {
                componentHandler.upgradeAllRegistered();
            };

            $scope.clear = function () {
                var revisedWidgetSet = [];
                var widgets = WidgetService.getWidgetsCollection();
                if (angular.isObject($scope.dashboardOfFocus)) {
                    for (var i = 0; i < widgets.length; i++) {
                        if ($scope.dashboardOfFocus.id != widgets[i].dashboard) {
                            revisedWidgetSet.push(widgets[i]);
                        }
                    }
                    WidgetService.setWidgetsCollection(revisedWidgetSet);
                    $scope.widgets = WidgetService.getWidgetsCollection();
                }
            };

            $scope.remove = function (widget) {
                var widgets = WidgetService.getWidgetsCollection();
                widgets.splice(widgets.indexOf(widget), 1);
                WidgetService.setWidgetsCollection(widgets);
                $scope.widgets = WidgetService.getWidgetsCollection();
            };

            $scope.openSettings = function (widget) {
                $modal.open({
                    scope: $scope,
                    templateUrl: 'app/widgets/partialViews/widgetSettings.tmpl.html',
                    controller: 'WidgetSettingsController',
                    resolve: {
                        widget: function () {
                            return widget;
                        }
                    }
                });
            };

            $scope.addWidget = function () {
                WidgetService.addNewWidget({
                    name: "New Widget",
                    sizeX: 1,
                    sizeY: 1
                });
            };

            function handleGridsterItemResize(widget) {
                console.log("sizeX is now: " + widget.sizeX);
            };

            function handleGridsterResize(obj) {

                console.log("Gridster widget was resized!");
                var width = obj[0];
                var numOfCols = 1;
                var rightMargin = $scope.gridConfig.margins[0];
                var leftMargin = $scope.gridConfig.margins[1];

                if (width > 0 && width < 320) {
                    numOfCols = 1;
                } else if (width > 320 && width < 480) {
                    numOfCols = 1;
                } else if (width > 480 && width < 768) {
                    numOfCols = 2;
                } else if (width > 768 && width < 996) {
                    numOfCols = 3;
                } else {
                    numOfCols = Math.floor(width / (($scope.gridConfig.colWidth) - (rightMargin - leftMargin - 0)));
                }

                $scope.gridConfig.columns = numOfCols;
                $scope.gridConfig.minColumns = numOfCols;
                var currentSumWidth = numOfCols * ($scope.gridConfig.colWidth);
                var tileMargin = ((width - currentSumWidth) / (numOfCols / 2));
                /* This code will change the margins and align the tiles, I just need to find a way to do it without changing the tile size
                $scope.gridConfig.margins[0] = tileMargin;
                $scope.gridConfig.margins[1] = tileMargin;
                */
            }

            $scope.$on('gridster-item-resized', function (item) {
                console.log("item is changed");
                handleGridsterItemResize(item);
            });

            $scope.$on('gridster-resized', function (event, obj) {

                handleGridsterResize(obj);
            });

            $scope.init();
            initDashboard();
            var targetDashboard = DashboardService.getDashboardOfFocus();
            $scope.dashboardOfFocus = (angular.isObject(targetDashboard)) ? targetDashboard : $scope.dashboards[0];
                }]);