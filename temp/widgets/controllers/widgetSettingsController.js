'use strict';

angular.module('dashboardModule')
    .controller('WidgetSettingsController', ['$scope', '$timeout', '$rootScope', '$modalInstance', 'widget',
 function ($scope, $timeout, $rootScope, $modalInstance, widget) {
            $scope.widget = widget;

            $scope.form = {
                type: widget.type,
                sizeX: widget.sizeX,
                sizeY: widget.sizeY,
                col: widget.col,
                row: widget.row
            };

            $scope.sizeOptions = [{
                id: '1',
                name: '1'
  }, {
                id: '2',
                name: '2'
  }, {
                id: '3',
                name: '3'
  }, {
                id: '4',
                name: '4'
  }];

            $scope.dismiss = function () {
                $modalInstance.dismiss();
            };

            $scope.remove = function () {
                $scope.dashboard.widgets.splice($scope.dashboard.widgets.indexOf(widget), 1);
                $modalInstance.close();
            };

            $scope.submit = function () {
                angular.extend(widget, $scope.form);
                $modalInstance.close(widget);
            };
 }
])