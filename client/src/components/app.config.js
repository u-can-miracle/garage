(function() {
    'use strict';

    angular
        .module('app')
        .config(configFunc);

    configFunc.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'ngToastProvider'];


    function configFunc($stateProvider, $urlRouterProvider, $locationProvider, ngToastProvider) {
        $locationProvider.html5Mode(true);
        ngToastProvider.configure({
            animation: 'slide' // or 'fade'
        });

        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    '': {
                        templateUrl: './partials/main',
                        controller: 'appCtrl as vm'
                    },
                    'old-courses@main': {
                        templateUrl: './partials/old-courses'
                    },
                    'new-courses@main': {
                        templateUrl: './partials/new-courses'
                    }
                }
            });

        $urlRouterProvider.otherwise('/');
    }
})();


