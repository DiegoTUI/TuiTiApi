/**
 * @author Diego Lafuente
 */
(function(){
    
    Ti.API.info("entered testTicketAvail");
    
    var TicketAvailRequest = require('api/TicketAvailRequest');
    var responseJson = null;
    
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
    
    function ok(response) {
        //Ti.API.info("ok called: " + response);
        responseJson = response;
    }
    
    function nok(response) {
        Ti.API.info("nok called: " + response);
        responseJson = {error: response};
    }
    
    describe('Testing ticket avail request', function() {
        it('should call TicketAvail on ATLAS and get a proper response', function() {
            responseJson = null;
            var parameters = {
                Language: "ENG",
                Credentials_User: "ISLAS",
                ServiceOccupancy_AdultCount: "1"
            };

            var ticketAvailRequest = new TicketAvailRequest(parameters, ticketAvailMapAlt);
            ticketAvailRequest.sendRequest(ok, nok);
            waitsFor(function(){ return (responseJson != null);});
            runs(function(){
                expect("error" in responseJson).toBe(false);
                expect(responseJson.ServiceTicketList.length).toEqual(parseInt(responseJson.TotalItems));
            });
        });
    });
    
})();