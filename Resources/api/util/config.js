/**
 * @author dlafuente
 */

var config = new function(){
	//self reference
	var self = this;
	//requires
	var util = require('api/util/util');
	//System info
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	Ti.API.info("Platform name: " + Ti.Platform.name + " - width: " + width + " - height: " + height + " - version: " + version);
	//Is tablet?
	self.isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	//Base URL
	self.BASE_URL = "http://54.246.80.107/api/";
	//Token and sessionId token lengths
	self.TOKEN_LENGTH = 8;
	self.SESSION_ID_LENGTH = 8;
	//Max number of connection retries
	self.MAX_CONNECTION_RETRIES = 3;
	//ATLAS constants
	self.ATLAS = {
    url: 'http://54.246.80.107/appservices/http/FrontendService',
    ticketAvailRequest : '<TicketAvailRQ echoToken="$echoToken$" sessionId="$sessionId$" \
        xmlns="http://www.hotelbeds.com/schemas/2005/06/messages" \
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" \
        xsi:schemaLocation="http://www.hotelbeds.com/schemas/2005/06/messages TicketAvailRQ.xsd"> \
      <Language>$Language$</Language> \
      <Credentials> \
        <User>$Credentials_User$</User> \
        <Password>$Credentials_Password$</Password> \
      </Credentials> \
      <PaginationData itemsPerPage="$PaginationData_itemsPerPage$" pageNumber="$PaginationData_pageNumber$"/> \
      <ServiceOccupancy> \
        <AdultCount>$ServiceOccupancy_AdultCount$</AdultCount> \
        <ChildCount>$ServiceOccupancy_ChildCount$</ChildCount> \
      </ServiceOccupancy> \
      <Destination code="$Destination_code$" type="SIMPLE"/> \
      <DateFrom date="$DateFrom_date$"/> \
      <DateTo date="$DateTo_date$"/> \
    </TicketAvailRQ>'   
    };
    //ATLAS defaults
    self.ATLAS_DEFAULTS = {};
    self.ATLAS_DEFAULTS["ticketAvailRequest"] = {
        echoToken: function(){return util.randomString(self.TOKEN_LENGTH)},
        sessionId: function(){return util.randomString(self.SESSION_ID_LENGTH)},
        Language: "ENG",
        Credentials_User: "ISLAS",
        Credentials_Password: "ISLAS",
        PaginationData_itemsPerPage: "25",
        PaginationData_pageNumber: "1",
        ServiceOccupancy_AdultCount: "1",
        ServiceOccupancy_ChildCount: "0",
        Destination_code: "PMI",
        DateFrom_date: function(){
            var date = new Date();
            return util.atlasDate (date);
        },
        DateTo_date: function(){
            var date = new Date();
            date.setDate(date.getDate() + 1);
            return util.atlasDate (date);
        }
    };
	
	return self;
};

module.exports = config;
