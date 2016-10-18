(function() {
    'use strict';

    angular
        .module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = [];

    function appCtrl() {
        var vm = this;
        vm.val = 'Ctrl val';

        vm.courses = [{
            name: 'Yoga',
            new: false,
            published: new Date(2011, 11, 14)
        },{
            name: 'Tennis',
            new: true,
            published: new Date(2018, 6, 14)
        }]
    }
})();