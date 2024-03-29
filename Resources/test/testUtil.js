/**
 * @author dlafuente
 */

(function(){
	
	Ti.API.info("entered testUtil");
	
	Ti.include(Titanium.Filesystem.resourcesDirectory + 'api/util/core.js');
	
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
			var arrayIds = [];
            for (var i=0; i<10000; i++){
                arrayIds.push(util.randomString(config.TOKEN_LENGTH));
                expect(arrayIds[i]).toHaveLength(config.TOKEN_LENGTH);
            }
            var reducedArray = util.removeDuplicates(arrayIds);
            Ti.API.info("arrayIds: " + arrayIds.length + " - reducedArray: " + reducedArray.length);
            expect(arrayIds.length).toBe(reducedArray.length);
		});
	});
	
	describe('jsonToXml', function() {
        Ti.API.info("entered jsonToXml");

        var jsonObject = {
            HotelListRQ: {
                "@echoToken": "DummyEchoToken",
                "@xmlns": "http://www.hotelbeds.com/schemas/2005/06/messages",
                "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "@xsi:schemaLocation": "http://www.hotelbeds.com/schemas/2005/06/messages HotelListRQ.xsd",
                Language: "ENG",
                Credentials:{
                    User: "ISLAS",
                    "Password": "ISLAS"
                },
                Destination:{
                    "@code": "PMI",
                    "@type": "SIMPLE",
                    "#value": "Palma"
                },
                ZoneList:[{zone:{"@code":"01",
                                 "name":"Alcudia"}},
                          {zone:{"@code":"02",
                                 "name":"Andratx"}},
                          {zone:{"@code":"03",
                                 "name":"Portals"}}
                ],
                "#list":[{classification:{"@code":"01",
                                          "#value":"class1"}},
                         {classification:{"@code":"02",
                                          "#value":"class2"}}
                ]
            }
        }
        it('should convert JSON into XML correctly', function() {
            var xmlString = util.jsonToXml(jsonObject);
            for (var key in jsonObject) {
                checkNode(key, jsonObject[key], xmlString);
            }
        });
        
        function checkNode(key, value, xmlString) {
            if (key.startsWith('@')) {
                expect(xmlString.contains(key.substringFrom('@'))).toBe(true);
            } else if (key === '#value') {
                expect(xmlString.contains(value)).toBe(true);
            } else if (key === '#list') {
                for (var i=0; i<value.length; i++) {
                    for (var innerKey in value[i]) {
                        checkNode(innerKey, value[i][innerKey], xmlString);
                    }
                }
            } else {
                expect(xmlString.contains('<'+key)).toBe(true);
                expect(xmlString.contains('</'+key+'>')).toBe(true);
                if (typeof value === "string") {
                    expect(xmlString.contains(value)).toBe(true);
                } else if (value instanceof Array) {
                    for (var i=0; i<value.length; i++) {
                        for (var innerKey in value[i]) {
                            checkNode(innerKey, value[i][innerKey], xmlString);
                        }
                    }
                } else if (value instanceof Object) {
                    for (var innerKey in value) {
                        checkNode(innerKey, value[innerKey], xmlString);
                    }
                }
            }
        }
    });
	
})();
