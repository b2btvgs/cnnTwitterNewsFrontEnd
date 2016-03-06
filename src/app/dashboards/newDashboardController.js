'use strict';

angular.module('app')
    .controller('NewDashboardController', ['$scope', '$timeout', '$rootScope', '$modalInstance',
function ($scope, $timeout, $rootScope, $modalInstance) {
            $scope.newDashboard = null;
            $scope.form = {
                title: this.title,
                description: this.description
            };

            $scope.dismiss = function () {
                $modalInstance.dismiss();
            };

            $scope.submit = function () {
                $modalInstance.close();
                var newDashboard = {
                    id: $scope.form.title + "dshbrd",
                    title: $scope.form.title,
                    concept: $scope.form.description
                };
                $scope.dashboards.push(newDashboard);
            };

}
])