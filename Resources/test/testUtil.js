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
			var lastId = util.randomString(config.TOKEN_LENGTH);
			expect(lastId).toHaveLength(config.TOKEN_LENGTH);
			for (var i=0; i<10000; i++){
				var newId = util.randomString(config.TOKEN_LENGTH);
				expect(lastId).toHaveLength(config.TOKEN_LENGTH);
				expect(newId).toNotEqual(lastId);
				lastId = newId;
			}
		});
	});
	
})();
