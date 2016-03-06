angular.module('userModule', ['satellizer'])
    .config(function ($authProvider) {

        $authProvider.twitter({
            url: 'api/user/login'
        });
    });