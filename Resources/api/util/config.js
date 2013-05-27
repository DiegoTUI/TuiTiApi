/**
 * @author dlafuente
 */

var config = new function(){
	//self reference
	var self = this;
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
	self.TOKEN_LENGTH = 12;
	self.SESSION_ID_LENGTH = 12;
	
	return self;
};

module.exports = config;
