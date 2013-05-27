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
	 */
	self.randomString = function (length)
	{
	    var random = Math.abs(Math.floor(Math.random() * 0x100000000000));
        var result = random.toString(36).slice(-length);
        while (result.length < length)
        {
            result = '0' + result;
        }
        return result;
		//return Math.random().toString(36).substr(2, length);
	}
	
	return self;
}


module.exports = util;