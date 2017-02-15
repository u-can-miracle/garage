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
					change: '&onChange'
				},
				template: '<input ng-model="textEdit">'
			};

			function linkFunction(scope, element, attrs){
				var beforeEditValue;
				var afterEditValue;

				element.addClass('text-editer');
				element.focusin(function(){
					element.addClass('active');
					beforeEditValue = scope.textEdit;
				});
				element.focusout(function(){
					element.removeClass('active');
					afterEditValue = scope.textEdit;

					if(beforeEditValue !== afterEditValue){
						scope.change();
					}
				});
			}
		}
	})();	