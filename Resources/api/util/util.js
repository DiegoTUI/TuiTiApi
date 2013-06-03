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
    
    /**
     * Splits the string using the dot as separator and returns the last element of the split with "List"
     * added at the end.
     * @param str: the string to listify
     * @return the string listified
     */
    /*self.listifyString = function (str) {
        return str.split('.').pop() + "List";
    };*/
    
	return self;
}


module.exports = util;