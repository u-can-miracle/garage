(function() {
    'use strict';

    angular
        .module('app')
        .config(configFunc);

    configFunc.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', 'ngToastProvider'];


    function configFunc($stateProvider, $urlRouterProvider, $locationProvider, ngToastProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        ngToastProvider.configure({
            animation: 'slide' // or 'fade'
        });

        $stateProvider
            .state('main', {
                abstract: true,
                template: '<div ui-view></div>',
                url: '/'  
            })        
            .state('main.login', {
                url: 'login',
                controller: 'loginController as vm',
                templateUrl: '/components/login/templates/login.html'
            })
            .state('main.confirm', {
                url: 'confirm/:hash',
                controller: 'loginController as vm',
                templateUrl: '/components/login/templates/confirm.html'
            })
            .state('main.project', {
                url: 'project',
                controller: 'projContainerCtrl as projContCtrl',
                templateUrl: '/components/project/templates/project-container.html'
            });

        $urlRouterProvider.otherwise('/login');
    }
})();


