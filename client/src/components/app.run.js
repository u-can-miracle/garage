(function() {
    'use strict';

    angular
        .module('app')
        .run(appRun);

    appRun.$inject = ['$state', '$rootScope'];

    function appRun($state, $rootScope) {
        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.log(arguments);
        });
    }
})();

