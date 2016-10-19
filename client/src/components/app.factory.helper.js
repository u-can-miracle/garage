(function() {
	'use strict';

	angular
	  .module('app')
	  .factory('factoryHelper', factoryHelper);

	factoryHelper.$inject = [];

	function factoryHelper() {
		var factory = {
			notAllowWhitespace: notAllowWhitespace
		};
		
		return factory;

        function notAllowWhitespace(inputModelValue) {
            if(inputModelValue){
                return inputModelValue.replace(/\s+/g, '');
            } else {
                return inputModelValue;
            }
        }		
	}
})();