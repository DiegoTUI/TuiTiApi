/**
 * @author dlafuente
 */

/**
 * Util toolbox
 */
var util = new function (){
	//self reference
	var self = this;
	
	var seed = 0;
	
	/**
	 * Generate a random string in base 36 with a custom length.
	 * @param length: the custom length of the string
	 * @return a random string of a certain length
	 */
	self.randomString = function(length) {
	    var textArray = [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
        for( var i=0; i < length; i++ )
            textArray.push(possible.charAt(Math.floor(Math.random() * possible.length)));
    
        return textArray.join('');
        
       /*// var random = Math.abs(Math.floor(Math.random() * 0x100000000000));
       // var result = random.toString(36).slice(-8);
       var result = seed.toString();
        while (result.length < 8)
        {
            result = '0' + result;
        }
        seed++;
        return result;*/
	}
	
	/**
     * Eliminates duplicates in an array
     * @param arr: the array
     * @return an array with no duplicates
     */
    self.removeDuplicates = function(arr) {
        var result = [];
        var auxobj = {};
        for (var i=0; i<arr.length; i++) {
            auxobj[arr[i]] = 0;
        }
        for (var i in auxobj) {
            result.push(i);
        }
        return result;
    }
	
	return self;
}


module.exports = util;