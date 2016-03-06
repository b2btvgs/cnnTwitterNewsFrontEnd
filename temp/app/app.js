angular
    .module('app', ['userModule', 'dashboardModule', 'ui.bootstrap',
        'ui.router', 'ngStorage'])
    .config(function ($stateProvider) {

        $stateProvider
            .state('8000', {
                url: ':8000',
                data: {
                    'selectedTab': 1
                },
                templateUrl: 'app/common/main.tmpl.html',
                controller: 'UserController'
            })
            .state('/', {
                url: '/',
                data: {
                    'selectedTab': 1
                },
                templateUrl: 'app/common/main.tmpl.html',
                controller: 'UserController'
            })
            .state('dashboards', {
                url: '/dashboards',
                data: {
                    'selectedTab': 1
                },
                templateUrl: 'app/dashboards/dashboard.tmpl.html',
                controller: 'DashboardController as dbc'
            })
            .state('sanKey', {
                url: '/sanKey',
                data: {
                    'selectedTab': 1
                },
                template: '<sankey-data-widget></sankey-data-widget>'
            });
        //            .state('contact', {
        //                url: '/contact',
        //                data: {
        //                    'selectedTab': 2
        //                },
        //                templateUrl: 'app/widgets/partialViews/contact.html',
        //                controller: 'PortfolioController as pc'
        //            });
        //            .state('edit', {
        //                url: '/edit',
        //                data: {
        //                    'selectedTab': 2
        //                },
        //                templateUrl: 'src/templates/edit.html',
        //                controller: 'EditController as ed'
        //            })
        //            .state('help', {
        //                url: '/help',
        //                data: {
        //                    'selectedTab': 2
        //                },
        //                templateUrl: 'src/templates/help.html',
        //                controller: 'HelpController as hc'
        //            });
    });