/**
 * @author Diego Lafuente
 */

Ti.include(Titanium.Filesystem.resourcesDirectory + 'api/util/core.js');

/**
 * The XML Reader string class. Receives an xml string and a description map and returns an array of objects
 * @param xmlString: the xml in string format
 * @param descriptionMap: an array representing the values to be extracted from the xml.
 * @param tag: the tag representing the objects in the xml to be read. If the tag is null or empty, the map refers to the root element.
 * see testXmlReader to fully understand this class
 */
var XmlReader = function(xmlString, descriptionMap, tag)
{
    // self-reference
    var self = this;
    //util toolbox
    var util = require('api/util/util');

    /**
     * Reads the objects from the xmlString using the descriptionMap
     * Returns an array of JS objects
     */
    self.readObjects = function() {
        //initialize result
        var result =[];
        //wrap the string in a jquery object
        var xmlObject = Ti.XML.parseString(xmlString);
        //parse it
        if (tag && (tag.length > 0)) {   //there is a tag to go for
            var nodeList = xmlObject.getElementsByTagName(tag);
            for (var i=0; i<nodeList.length; i++) {
                //Ti.API.info("Processing element... " + i);
                result.push(processElement(nodeList.item(i), descriptionMap));
            }
        } else {    //No tag, browse the root element
            result = processElement(xmlObject.cloneNode(true), descriptionMap);
        }
        
        return result;
    }

    /**
     * Process an element of the xml according to the description Map and returns an object
     * element: could be a Ti.XML.Node or a Ti.XML.Document
     */
    function processElement(element, descriptionMap) {
        //initialize result
        var result = {};
        //iterate descriptionMap
        for (var i=0; i<descriptionMap.length; i++) {
            //Ti.API.info("Started iteration " + i + "/" + (descriptionMap.length-1));
            var item = descriptionMap[i];
           // Ti.API.info("Processing item: " + JSON.stringify(item));
            if (typeof item === 'string') { //It's a string
                result[item] = element.getElementsByTagName(item).item(0).textContent;
                //Ti.API.info("Found string in descriptionMap. Field: " + item +". Value: " + result[item]);
            } 
            else if (typeof item === 'object') {    //It's a dictionary
                if (Object.keys(item).length !== 1) 
                    Ti.API.error ("Malformed descriptionMap. More than 1 element in object: " + JSON.stringify(item));
                //get the first (and only) key of the dictionary
                for (var key in item) {
                    var value = item[key];
                    if (value instanceof Array) {   //It's a list
                        //Ti.API.info("Key: " + key + " is listified as: " + key.listify());
                        //initialize list
                        var listifiedKey = key.listify();
                        result[listifiedKey] = [];
                        
                        //Get the NodeList that defines the actual list
                        var listNodeList = nodeListInPath(element, key);
                        //go through it and parse each element
                        for (var j=0; j<listNodeList.length; j++) {
                            //Ti.API.info("Checking for: " + key);
                            result[listifiedKey].push(processElement(listNodeList.item(j), value));
                        }
                    }
                    else if (typeof value === 'string') {   //It's a deep value
                        //Ti.API.info("deep value: " + key + " - " + value);
                        result[key] = valueInXml(element, value);
                    }
                    break; //we only consider the first key
                }
            }
            //Ti.API.info("Finished iteration " + i + "/" + (descriptionMap.length-1));
        }
        //Ti.API.info("result about to be returned: " +JSON.stringify(result));
        return result;
    }
    
    /**
     * Explores the given XML element and returns nodeList indicated by the path
     * element: could be a Ti.XML.Node or a Ti.XML.Document. Contains the element to look in.
     * path: a dot separated string like string like "TicketInfo.ImageList.Image" containing the path to look in.
     */
    function nodeListInPath(element, path) {
        var result = element;
        var pathArray = path.split('.');
        //the first elements of the path have to be unique
        for (var i=0; i<pathArray.length - 1; i++) {
            result = result.getElementsByTagName(pathArray[i]).item(0);
        }
        //the last element defines the nodeList
        result = result.getElementsByTagName(pathArray[pathArray.length - 1]);
        //Ti.API.info("Returning NodeList of length " + result.length + " for path " + path);
        return result;
    }

    /**
     * Explores an xml element and returns the value in path
     * element: could be a Ti.XML.Node or a Ti.XML.Document. Contains the element to look i
     * path: a dot-seàrated string like "Description.@languageCode" containing the path to look in. "@" is for attributes
     */
    function valueInXml (element, path) {
        var realPath = path.startsWith('@') ? path.substringUpTo('@') : path.substringUpTo('.@');
        var attribute = path.substringFrom('@');
        var tip = realPath.length == 0 ? element : nodeListInPath(element,realPath).item(0);
        var value = null;
        if (attribute === '') { //No attributes
            value = tip.textContent;
        }
        else {  //There is an attribute at the end
            var attributes = tip.getAttributes();
            var namedItem = attributes.getNamedItem(attribute);
            value = namedItem.textContent;
            //value = tip.getAttributes().getNamedItem(attribute).textContent;
        }
        //Ti.API.info("Value for path " + path + ": " + value + ". RealPath: " + realPath + " - Attribute: " + attribute + " - Replaced RealPath: " + realPath.replace(/\./g,' '));
        return value;
    }

    return self;
}

module.exports = XmlReader;