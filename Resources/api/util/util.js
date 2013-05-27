/**
 * @author dlafuente
 */

/**
 * Util toolbox
 */
var util = new function (){
	//self reference
	var self = this;
	
	/**
	 * Generate a random string in base 36 with a custom length.
	 * length: the custom length of the string
	 * returns a random string of a certain length
	 */
	self.randomString = function(length) {
	    var random = Math.abs(Math.floor(Math.random() * 0x100000000000));
        var result = random.toString(36).slice(-length);
        while (result.length < length)
        {
            result = '0' + result;
        }
        return result;
		//return Math.random().toString(36).substr(2, length);
	}
	
	/**
     * Eliminates duplicates in an array
     * arr: the array
     * returns an array with no duplicates
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