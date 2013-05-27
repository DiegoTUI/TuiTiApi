/**
 * @author Diego Lafuente
 */

(function(){
    
    Ti.API.info("entered testParametrizedString");
    
    var ParametrizedString = require('api/util/ParametrizedString');
    var baseString = 'Hallo $who$. You $action$ my $relative$ $times$'
    
    describe('Parametrized String', function() {
        it('should build an empy Parametrized string when constructed with no parameters', function() {
            var paramString = new ParametrizedString();
            expect(typeof(paramString.replaceAll())).toBe("undefined");
            expect(typeof(paramString.replaceAllClean())).toBe("undefined");
            expect(paramString.getLooseKeys().length).toBe(0);
        });
        it('should work fine with the exact number of parameters', function() {
            var params = {
                who: "peoples",
                action: "fuck",
                relative: "mother",
                times: "twice"
            };
            var paramString = new ParametrizedString(baseString, params);
            expect(paramString.replaceAll()).toBe("Hallo peoples. You fuck my mother twice");
            expect(paramString.replaceAllClean()).toBe("Hallo peoples. You fuck my mother twice");
            expect(paramString.getLooseKeys().length).toBe(0);
        });
        it('should work fine with too many parameters', function() {
            var params = {
                who: "peoples",
                action: "fuck",
                relative: "mother",
                extra1: "extra",
                times: "twice",
                extra2: "crap"
            };
            var paramString = new ParametrizedString(baseString, params);
            expect(paramString.replaceAll()).toBe("Hallo peoples. You fuck my mother twice");
            expect(paramString.replaceAllClean()).toBe("Hallo peoples. You fuck my mother twice");
            expect(paramString.getLooseKeys().length).toBe(0);
        });
        it('should work fine with too few parameters', function() {
            var params = {
                who: "peoples",
                action: "fuck",
                extra1: "extra",
                extra2: "crap"
            };
            var paramString = new ParametrizedString(baseString, params);
            expect(paramString.replaceAll()).toBe("Hallo peoples. You fuck my $relative$ $times$");
            expect(paramString.replaceAllClean()).toBe("Hallo peoples. You fuck my  ");
            expect(paramString.getLooseKeys().length).toBe(2);
        });
    });
    
})();