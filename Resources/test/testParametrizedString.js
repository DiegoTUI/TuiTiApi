/**
 * @author Diego Lafuente
 */

(function(){
    
    Ti.API.info("entered testParametrizedString");
    
    var ParametrizedString = require('api/util/ParametrizedString');
    
    describe('Parametrized String', function() {
        it('should build an empy Parametrized string when constructed with no parameters', function() {
            var paramString = new ParametrizedString();
            expect(typeof(paramString.replaceAll())).toBe("undefined");
            expect(typeof(paramString.replaceAllClean())).toBe("undefined");
            expect(paramString.getLooseKeys().length).toBe(0);
        });
    });
    
})();