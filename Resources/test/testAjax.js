/**
 * @author Diego Lafuente
 */

(function(){
    
    Ti.API.info("entered testAjax");
    
    var ajax = require('api/IO/ajax');
    var dumbUrl = 'http://54.246.80.107/api/';
    var responseJson = null;
    
    beforeEach(function(){
        this.addMatchers({
            toEqualDictionary: function(dict) {
                var otherdict = this.actual;
                for (var i in dict) {
                    if (!(i in otherdict)) {
                        Ti.API.info("Property not found in this: " + i);
                        return false;
                    }
                    if (dict[i] !== otherdict[i]) {
                        Ti.API.info("value for property " + i + " does not match in this: " + otherdict[i]);
                        return false;
                    }
                }
                return true;
            }
        });
    });
    
    function ok(response) {
        Ti.API.info("ok called: " + response);
        try {
            responseJson = JSON.parse(response);
        } catch (e) {
            responseJson = {error: e};
        }
    }
    
    function nok(response) {
        Ti.API.info("nok called: " + response);
        responseJson = {error: response};
    }
    
    describe('Testing dumb ajax calls', function() {
        
        it('should call test_get with parameters and receive the result', function() {
            var url = dumbUrl + 'test_get.php?field1=holy&field2=crap';
            responseJson = null;
            ajax.send("GET", url, null, ok, nok);
            waitsFor(function(){ return (responseJson != null);});
            runs(function(){
                var expectedOutput = {
                    rf1:"holy",
                    rf2:"crap",
                    rfb:""
                };
                expect(responseJson).toEqualDictionary(expectedOutput);
            });
        });
        
         it('should miserably fail when calling an invalid url', function() {
            var url = dumbUrl + 'test_get?field1=holy&field2=crap';
            responseJson = null;
            ajax.send("GET", url, null, ok, nok);
            waitsFor(function(){ return (responseJson != null);});
            runs(function(){
                expect("error" in responseJson).toBe(true);
            });
        });
    });
    
})();