angular.module('dashboardModule')
    .directive('portfolioAccountsWidget', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/widgets/partialViews/portfolioAccounts.tmpl.html',
            controller: 'PortfolioController',
            controllerAs: 'portfolioCtl'
        }
    });