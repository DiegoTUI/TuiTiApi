/**
 * @author Diego Lafuente
 */

/**
 * The TicketAvail request.
 * @param queryParameters: the parameters to build the xml and perform the call
 * @param descriptionMap: the json describing wich fields you want to read from the xml
 * @param tag: the tag to indicate which objects in the xml should we look for. Root if undefined or null
 */
 var TicketAvailRequest = function(queryParameters, descriptionMap, tag)
{
    // self-reference
    var self = this;

    //requires
    var ParametrizedString = require('api/util/ParametrizedString');
    var ajax = require('api/IO/ajax');
    var XmlReader = require('api/IO/XmlReader');
    var config = require('api/util/config');

    //Initialize query parameters
    initQueryParams();

    /**
     * Sends the ajax request to the apropriate url with the right xml and query parameters
     * ok: callback in case of ok
     * nok: callback in case of not ok
     */
    self.sendRequest = function(ok, nok) {
        var parametrizedRequest = new ParametrizedString(config.ATLAS.ticketAvailRequest, queryParameters);
        var data = {xml_request: parametrizedRequest.replaceAllClean()};
        Ti.API.info("about to launch request: " + JSON.stringify(data));
        ajax.send("POST", config.ATLAS.url, data, ajax.process([parseResponse, ok]), nok);
    }

    /**
     * Check the query parameters and creates (if needed) some of the compulsory fields
     */
    function initQueryParams() {
        //tui.debug("atlasDefaults for ticketAvailRequest: " + JSON.stringify(config.ATLAS_DEFAULTS.ticketAvailRequest)); 
        for (var key in config.ATLAS_DEFAULTS.ticketAvailRequest) {
            if (!(key in queryParameters)){
                queryParameters[key] = typeof config.ATLAS_DEFAULTS.ticketAvailRequest[key] === "function" ?
                                            config.ATLAS_DEFAULTS.ticketAvailRequest[key]() : config.ATLAS_DEFAULTS.ticketAvailRequest[key];
            }
        }
    }
    /**
     * Parses the xml received according to the provided descriptionMap and returns the result
     * data: the xml received
     */
    function parseResponse(data) {
        var xmlReader = new XmlReader (data, descriptionMap, tag);
        return xmlReader.readObjects();
    }

    return self;
}

module.exports = TicketAvailRequest;
