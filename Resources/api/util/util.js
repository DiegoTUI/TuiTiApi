/**
 * @author dlafuente
 */

Ti.include(Titanium.Filesystem.resourcesDirectory + 'api/util/core.js');

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
     * Return the date object in ATLAS format: yyyymmdd.
     * @param date: a date object
     * @return a string with the atlas date
     */
    self.atlasDate = function(date)
    {
         return (date.getFullYear()*10000 + (date.getMonth()+1)*100 + date.getDate()).toString();
    }
    
    /**
     * Produce an XML string from a properly formatted JSON.
     * Uses "@" for attributes, "#value" for values and "#list" for lists
     * See testUtil examples to fully understand how this works
     * @param jsonObject: a properly formatted JSON object
     * @return a XML string with the XML representation of the JSON object
     */
    self.jsonToXml = function(jsonObject) {
        var xmlString = "";
        for (var key in jsonObject) {
            xmlString += processNode(key, jsonObject[key]);
        }
        return xmlString;
    }
    
    /**
     * Produce an XML string from a node of a JSON object.
     * @param key: the key of the JSON node
     * @param value: the value of the JSON node
     * @return a XML string with the XML representation of the JSON node
     */
    function processNode(key, value) {
        var result = "";
        if (key === '#list') {  //It's a "no-key" list
            if (!(value instanceof Array))
                Ti.API.error ("Malformed JSON node with key " + key + " and value" + JSON.stringify(value));
            for (var i=0; i< value.length; i++) {
                for (var innerKey in value[i]) {
                    result += processNode (innerKey, value[i][innerKey]);
                }
            }  
        } else {    //It's a "regular" node
            result += '<' + key;
            if (typeof value === "string") {  //"regular" value
                Ti.API.info("instance of string: " + key + " - " + value);
                result += '>' + value;
            } else if (value instanceof Array) { //it's a "key" list
                result += '>\n';
                for (var i=0; i< value.length; i++) {
                    for (var innerKey in value[i]) {
                        result += processNode (innerKey, value[i][innerKey]);
                    }
                }   
            } else if (value instanceof Object) {   //the value is an object
                var innerKeys = Object.keys(value);
                var attributes = [];
                var textValue = null;
                var other = [];
                for (var i=0; i<innerKeys.length; i++) {
                    if (innerKeys[i].startsWith('@'))
                        attributes.push(innerKeys[i].substringFrom('@'));
                    else if (innerKeys[i] === '#value')
                        textValue = value[innerKeys[i]];
                    else
                        other.push(innerKeys[i]);
                }
                //check the attributes first
                for (var i=0; i<attributes.length; i++) {
                    result += ' ' + attributes[i] + '="' + value["@"+attributes[i]] + '"';
                }
                //close the tag
                result += '>\n';
                //check the text value
                if (textValue)
                    result += textValue;
                //check the rest of nodes
                for (var i=0; i<other.length; i++) {
                    result += processNode(other[i], value[other[i]]);
                }
            }
            //close the tag
            result += '</' + key + '>\n';
        }
        return result;
    }
    
	return self;
}


module.exports = util;