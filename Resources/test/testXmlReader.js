/**
 * @author Diego Lafuente
 */

(function(){
    
    Ti.API.info("entered testXmlReader");
    
    var XmlReader = require('api/IO/XmlReader');
    
    var ticketAvailString = '<TicketAvailRS xsi-schemaLocation="http://www.hotelbeds.com/schemas/2005/06/messages TicketAvailRS.xsd" totalItems="27" echoToken="DummyEchoToken"> \
        <AuditData> \
            <ProcessTime>647</ProcessTime> \
            <Timestamp>2013-05-13 10:49:38.031</Timestamp> \
            <RequestHost>10.162.29.83</RequestHost> \
            <ServerName>FORM</ServerName> \
            <ServerId>FO</ServerId> \
            <SchemaRelease>2005/06</SchemaRelease>  \
            <HydraCoreRelease>2.0.201304221213</HydraCoreRelease> \
            <HydraEnumerationsRelease>1.0.201304221213</HydraEnumerationsRelease> \
            <MerlinRelease>N/A</MerlinRelease> \
        </AuditData> \
        <PaginationData currentPage="1" totalPages="2"/> \
        <ServiceTicket xsi-type="ServiceTicket" availToken="9ey6mENxtyujqkVKnqvpMA=="> \
            <DateFrom date="DateFrom1"/> \
            <DateTo date="DateTo1"/> \
            <Currency code="EUR1">Euro1</Currency> \
            <TicketInfo xsi-type="ProductTicket"> \
                <Code>000200515</Code> \
                <Name>Ticket1</Name> \
                <DescriptionList> \
                    <Description type="generalDescription" languageCode="ENG">Description 11</Description> \
                    <Description type="generalDescription" languageCode="SPA">Description 12</Description> \
                </DescriptionList> \
                <ImageList> \
                    <Image> \
                        <Type>S</Type> \
                        <Order>0</Order> \
                        <VisualizationOrder>0</VisualizationOrder> \
                        <Url>Image11</Url> \
                    </Image> \
                    <Image> \
                        <Type>S</Type> \
                        <Order>0</Order> \
                        <VisualizationOrder>0</VisualizationOrder> \
                        <Url>Image12</Url> \
                    </Image> \
                    <Image> \
                        <Type>S</Type> \
                        <Order>0</Order> \
                        <VisualizationOrder>0</VisualizationOrder> \
                        <Url>Image13</Url> \
                    </Image> \
                </ImageList> \
            </TicketInfo> \
        </ServiceTicket> \
        <ServiceTicket xsi-type="ServiceTicket" availToken="9ey6mENxtyujqkVKnqvpMA=="> \
            <DateFrom date="DateFrom2"/> \
            <DateTo date="DateTo2"/> \
            <Currency code="EUR2">Euro2</Currency> \
            <TicketInfo xsi-type="ProductTicket"> \
                <Code>000200515</Code> \
                <Name>Ticket2</Name> \
                <DescriptionList> \
                    <Description type="generalDescription" languageCode="ENG">Description 21</Description> \
                    <Description type="generalDescription" languageCode="SPA">Description 22</Description> \
                </DescriptionList> \
                <ImageList> \
                    <Image> \
                        <Type>S</Type> \
                        <Order>0</Order> \
                        <VisualizationOrder>0</VisualizationOrder> \
                        <Url>Image21</Url> \
                    </Image> \
                    <Image> \
                        <Type>S</Type> \
                        <Order>0</Order> \
                        <VisualizationOrder>0</VisualizationOrder> \
                        <Url>Image22</Url> \
                    </Image> \
                    <Image> \
                        <Type>S</Type> \
                        <Order>0</Order> \
                        <VisualizationOrder>0</VisualizationOrder> \
                        <Url>Image23</Url> \
                    </Image> \
                </ImageList> \
            </TicketInfo> \
        </ServiceTicket> \
    </TicketAvailRS>';
    
    var ticketAvailMap = [
    {'DateFrom':'DateFrom.@date'},
    {'DateTo':'DateTo.@date'},
    'Currency',
    {'CurrencyCode': 'Currency.@code'},
    {'Name': 'TicketInfo.Name'},
    {'TicketInfo.DescriptionList.Description':[{'Type': '@type'},
                                    {'Description': ''}]},
    {'TicketInfo.ImageList.Image': [{'Type': 'Type'},
                                {'Url': 'Url'}]}];

    var ticketAvailMapAlt = [
    {'TotalItems':'@totalItems'},
    {'ServiceTicket':[{'DateFrom':'DateFrom.@date'},
        {'DateTo':'DateTo.@date'},
        'Currency',
        {'CurrencyCode': 'Currency.@code'},
        {'Name': 'TicketInfo.Name'},
        {'TicketInfo.DescriptionList.Description':[{'Type': '@type'},
                                    {'Description': ''}]},
        {'TicketInfo.ImageList.Image': [{'Type': 'Type'},
                                {'Url': 'Url'}]}
        ]}
    ];
                            
    
    var ticketClassificationListString = '<TicketClassificationListRS xsi-schemaLocation="http://www.hotelbeds.com/schemas/2005/06/messages TicketClassificationListRS.xsd" totalItems="9" echoToken="DummyEchoToken"> \
        <AuditData> \
            <ProcessTime>4</ProcessTime> \
            <Timestamp>2013-05-15 13:21:03.741</Timestamp> \
            <RequestHost>10.162.29.83</RequestHost> \
            <ServerName>FORM</ServerName> \
            <ServerId>FO</ServerId> \
            <SchemaRelease>2005/06</SchemaRelease> \
            <HydraCoreRelease>2.0.201304221213</HydraCoreRelease> \
            <HydraEnumerationsRelease>1.0.201304221213</HydraEnumerationsRelease> \
            <MerlinRelease>N/A</MerlinRelease> \
        </AuditData> \
        <Classification code="CULTU">Culture Museums</Classification> \
        <Classification code="FD">Full Day</Classification> \
        <Classification code="FOOD">Food Nightlife</Classification> \
        <Classification code="HD">In the morning</Classification> \
        <Classification code="MD">Multi Day Services</Classification> \
        <Classification code="OUTAC">Outdoor Adventure</Classification> \
        <Classification code="PARTE">Theme Aquatic Parks</Classification> \
        <Classification code="SHOW">Shows and Events</Classification> \
        <Classification code="SIGHT">Sightseeing Tours</Classification> \
    </TicketClassificationListRS>';
                        
    var ticketClassificationListMap = [
    {'Code':'@code'},
    {'Name':''}];
    
    var ticketClassificationListMapAlt = [
    {'TotalItems':'@totalItems'},
    {'Classification':[{'Code':'@code'},
                        {'Name':''}]}];
    
    describe('Xml Reader tests', function() {
        
        it('should parse ticketAvail correctly with no tag', function() {
            var xmlReader = new XmlReader (ticketAvailString, ticketAvailMapAlt);
            var parsedXml = xmlReader.readObjects();
            Ti.API.info("parsedXml: " + JSON.stringify(parsedXml));
            //Now chek some stuff about the parsed xml
            expect(parsedXml instanceof Array).toBe(true);
            expect(parsedXml.length).toBe(1);
            expect(parsedXml[0].TotalItems).toBe('27');
            expect(parsedXml[0].ServiceTicketList.length).toBe(2);
            expect(parsedXml[0].ServiceTicketList[0].DateFrom).toBe('DateFrom1');
            expect(parsedXml[0].ServiceTicketList[0].DateTo).toBe('DateTo1');
            expect(parsedXml[0].ServiceTicketList[1].DateFrom).toBe('DateFrom2');
            expect(parsedXml[0].ServiceTicketList[1].DateTo).toBe('DateTo2');
            expect(parsedXml[0].ServiceTicketList[0].Currency).toBe('Euro1');
            expect(parsedXml[0].ServiceTicketList[0].CurrencyCode).toBe('EUR1');
            expect(parsedXml[0].ServiceTicketList[1].Currency).toBe('Euro2');
            expect(parsedXml[0].ServiceTicketList[1].CurrencyCode).toBe('EUR2');
            expect(parsedXml[0].ServiceTicketList[0].Name).toBe('Ticket1');
            expect(parsedXml[0].ServiceTicketList[1].Name).toBe('Ticket2');
            for (var i=0; i<parsedXml[0].ServiceTicketList.length; i++) {
                var imageList = parsedXml[0].ServiceTicketList[i]['TicketInfo.ImageList.Image'.listify()];
                var descriptionList = parsedXml[0].ServiceTicketList[i]['TicketInfo.DescriptionList.Description'.listify()];
                expect(imageList.length).toBe(3);
                for (var j=0; j<3; j++) {
                    expect(imageList[j].Type).toBe("S");
                    expect(imageList[j].Url).toBe("Image"+(i+1)+""+(j+1))
                }
                expect(descriptionList.length).toBe(2);
                for (var j=0; j<2; j++) {
                    expect(descriptionList[j].Type).toBe("generalDescription");
                    expect(descriptionList[j].Description).toBe("Description "+(i+1)+""+(j+1))
                }
            }
        });
 
        it('should parse ticketAvail correctly with tag', function() {
            var xmlReader = new XmlReader (ticketAvailString, ticketAvailMap, 'ServiceTicket');
            var parsedXml = xmlReader.readObjects();
            Ti.API.info("parsedXml: " + JSON.stringify(parsedXml));
            //Now chek some stuff about the parsed xml
            expect(parsedXml instanceof Array).toBe(true);
            expect(parsedXml.length).toBe(2);
            expect(parsedXml[0].DateFrom).toBe('DateFrom1');
            expect(parsedXml[0].DateTo).toBe('DateTo1');
            expect(parsedXml[1].DateFrom).toBe('DateFrom2');
            expect(parsedXml[1].DateTo).toBe('DateTo2');
            expect(parsedXml[0].Currency).toBe('Euro1');
            expect(parsedXml[0].CurrencyCode).toBe('EUR1');
            expect(parsedXml[1].Currency).toBe('Euro2');
            expect(parsedXml[1].CurrencyCode).toBe('EUR2');
            expect(parsedXml[0].Name).toBe('Ticket1');
            expect(parsedXml[1].Name).toBe('Ticket2');
            for (var i=0; i<parsedXml.length; i++) {
                var imageList = parsedXml[i]['TicketInfo.ImageList.Image'.listify()];
                var descriptionList = parsedXml[i]['TicketInfo.DescriptionList.Description'.listify()];
                expect(imageList.length).toBe(3);
                for (var j=0; j<3; j++) {
                    expect(imageList[j].Type).toBe("S");
                    expect(imageList[j].Url).toBe("Image"+(i+1)+""+(j+1))
                }
                expect(descriptionList.length).toBe(2);
                for (var j=0; j<2; j++) {
                    expect(descriptionList[j].Type).toBe("generalDescription");
                    expect(descriptionList[j].Description).toBe("Description "+(i+1)+""+(j+1))
                }
            }
        });
        
        it('should parse classificationList correctly with no tag', function() {
            var xmlReader = new XmlReader (ticketClassificationListString, ticketClassificationListMapAlt);
            var parsedXml = xmlReader.readObjects();
            Ti.API.info("parsedXml: " + JSON.stringify(parsedXml));
            //Now chek some stuff about the parsed xml
            expect(parsedXml instanceof Array).toBe(true);
            expect(parsedXml.length).toBe(1);
            expect(parsedXml[0].TotalItems).toBe('9');
            expect(parsedXml[0].ClassificationList.length).toBe(9);
            expect(parsedXml[0].ClassificationList[0].Code).toBe('CULTU');
            expect(parsedXml[0].ClassificationList[0].Name).toBe('Culture Museums');
            expect(parsedXml[0].ClassificationList[1].Code).toBe('FD');
            expect(parsedXml[0].ClassificationList[1].Name).toBe('Full Day');
            expect(parsedXml[0].ClassificationList[2].Code).toBe('FOOD');
            expect(parsedXml[0].ClassificationList[2].Name).toBe('Food Nightlife');
            expect(parsedXml[0].ClassificationList[3].Code).toBe('HD');
            expect(parsedXml[0].ClassificationList[3].Name).toBe('In the morning');
            expect(parsedXml[0].ClassificationList[4].Code).toBe('MD'); 
            expect(parsedXml[0].ClassificationList[4].Name).toBe('Multi Day Services');
            expect(parsedXml[0].ClassificationList[5].Code).toBe('OUTAC');
            expect(parsedXml[0].ClassificationList[5].Name).toBe('Outdoor Adventure');
            expect(parsedXml[0].ClassificationList[6].Code).toBe('PARTE');
            expect(parsedXml[0].ClassificationList[6].Name).toBe('Theme Aquatic Parks');
            expect(parsedXml[0].ClassificationList[7].Code).toBe('SHOW');
            expect(parsedXml[0].ClassificationList[7].Name).toBe('Shows and Events');
            expect(parsedXml[0].ClassificationList[8].Code).toBe('SIGHT');
            expect(parsedXml[0].ClassificationList[8].Name).toBe('Sightseeing Tours');
        });
        
        it('should parse classificationList correctly with tag', function() {
            var xmlReader = new XmlReader (ticketClassificationListString, ticketClassificationListMap, 'Classification');
            var parsedXml = xmlReader.readObjects();
            Ti.API.info("parsedXml: " + JSON.stringify(parsedXml));
            //Now chek some stuff about the parsed xml
            expect(parsedXml instanceof Array).toBe(true);
            expect(parsedXml.length).toBe(9);
            expect(parsedXml[0].Code).toBe('CULTU');
            expect(parsedXml[0].Name).toBe('Culture Museums');
            expect(parsedXml[1].Code).toBe('FD');
            expect(parsedXml[1].Name).toBe('Full Day');
            expect(parsedXml[2].Code).toBe('FOOD');
            expect(parsedXml[2].Name).toBe('Food Nightlife');
            expect(parsedXml[3].Code).toBe('HD');
            expect(parsedXml[3].Name).toBe('In the morning');
            expect(parsedXml[4].Code).toBe('MD'); 
            expect(parsedXml[4].Name).toBe('Multi Day Services');
            expect(parsedXml[5].Code).toBe('OUTAC');
            expect(parsedXml[5].Name).toBe('Outdoor Adventure');
            expect(parsedXml[6].Code).toBe('PARTE');
            expect(parsedXml[6].Name).toBe('Theme Aquatic Parks');
            expect(parsedXml[7].Code).toBe('SHOW');
            expect(parsedXml[7].Name).toBe('Shows and Events');
            expect(parsedXml[8].Code).toBe('SIGHT');
            expect(parsedXml[8].Name).toBe('Sightseeing Tours');
        });
    });
    
})();