describe('textEdit directife testing: ', function() {
    var compile, scope, textEdit;


    beforeEach(function() {
        module('text-edit');

        inject(function($compile, $rootScope) {
            compile = $compile;
            scope = $rootScope.$new();

            scope.editValue = 'editValue';
            scope.changeHandler = sinon.stub();

            textEdit = getCompiledElement();
        });
    });


    function getCompiledElement() {
        var element = angular.element('<div text-edit="editValue" on-change="changeHandler()"></div>');
        var compiledElement = compile(element)(scope);
        scope.$digest();
        return compiledElement;
    }


    it('should have "text-editer" class after compile', function() {
        expect(textEdit.hasClass('text-editer')).toEqual(true);
    });

    it('should have "active" class after focusin', function() {
        textEdit.trigger('focusin');
        expect(textEdit.hasClass('active')).toEqual(true);
    });

    it('should not have "active" class after focusin', function() {
        textEdit.trigger('focusin');
        textEdit.trigger('focusout');
        expect(textEdit.hasClass('active')).toEqual(false);
    });

    it('should call scope.changeHandler() after model change', function() {
        textEdit.trigger('focusin');
        scope.editValue = 'newValue';
		scope.$apply();
        textEdit.trigger('focusout');

        expect(scope.changeHandler.callCount).toEqual(1);
    });

    it('should not call scope.changeHandler() if model not changed', function() {
        textEdit.trigger('focusin');
		scope.$apply();
        textEdit.trigger('focusout');

        expect(scope.changeHandler.callCount).toEqual(0);
    });
});