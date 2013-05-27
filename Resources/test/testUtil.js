/**
 * @author dlafuente
 */

(function(){
	
	Ti.API.info("entered testUtil");
	
	var util = require('api/util/util');
	var config = require('api/util/config');
	
	describe('RandomId', function() {
		Ti.API.info("entered randomId");
		
		beforeEach(function(){
			this.addMatchers({
				toHaveLength: function(len){
					return this.actual.length == len;
				}
			});
		});

		it('should return different 8 chars strings', function() {
		    var arrayIds = [];
			arrayIds.push(util.randomString(config.TOKEN_LENGTH));
			expect(arrayIds[0]).toHaveLength(config.TOKEN_LENGTH);
			for (var i=0; i<10000; i++){
				arrayIds.push(util.randomString(config.TOKEN_LENGTH));
				expect(arrayIds[i+1]).toHaveLength(config.TOKEN_LENGTH);
			}
			var reducedArray = util.removeDuplicates(arrayIds);
			expect(arrayIds.length).toEqual(reducedArray.length);
		});
	});
	
})();
