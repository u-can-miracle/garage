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
                templateUrl: 'components/login/login.html'
            })
            .state('main.todos', {
                url: 'todos',
                templateUrl: 'components/todos/todos.html'
            });

        $urlRouterProvider.otherwise('login');
    }
})();


