(function() {
		'use strict';
	
		angular
		  .module('text-edit')
		  .directive('textEdit', textEdit);
	
		function textEdit() {
			return{
				link: linkFunction,
				restrict: 'A',
				scope: {
					textEdit: '=',
					blur: '&onBlur'
				},
				template: '<input ng-model="textEdit">'
			};

			function linkFunction(scope, element, attrs){
				element.addClass('text-editer');
				element.focusin(function(){
					element.addClass('active');
				});
				element.focusout(function(){
					element.removeClass('active');
					scope.blur();
				});
			}
		}
	})();	