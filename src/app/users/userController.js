angular.module('userModule')
    .controller('UserController', function ($scope, $auth, $http, $log, $q) {

        $scope.isAuthenticated = $auth.isAuthenticated;

        $scope.selected = null;
        $scope.users = [];
        $scope.selectUser = selectUser;
        $scope.toggleList = toggleUsersList;
        $scope.showContactOptions = showContactOptions;

        $scope.login = function () {
            $auth.authenticate('twitter');
        }

        $scope.logout = function () {
            $auth.logout();
        }

        $scope.openLeftMenuPanel = function () {
            //            $mdSidenav('left').toggle();
        };

        function selectUser(user) {
            $scope.selected = angular.isNumber(user) ? $scope.users[user] : user;
            $scope.toggleList();
        };

        function toggleUsersList() {};

        function showContactOptions($event) {
            var user = self.selected;

            return $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: './src/users/view/contactSheet.html',
                controller: ['$mdBottomSheet', ContactPanelController],
                controllerAs: "cp",
                bindToController: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function ContactPanelController($mdBottomSheet) {
                this.user = user;
                this.actions = [
                    {
                        name: 'Phone',
                        icon: 'phone',
                        icon_url: 'assets/svg/phone.svg'
                            },
                    {
                        name: 'Twitter',
                        icon: 'twitter',
                        icon_url: 'assets/svg/twitter.svg'
                            },
                    {
                        name: 'Google+',
                        icon: 'google_plus',
                        icon_url: 'assets/svg/google_plus.svg'
                            },
                    {
                        name: 'Hangout',
                        icon: 'hangouts',
                        icon_url: 'assets/svg/hangouts.svg'
                            }
          ];
                this.submitContact = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

    });