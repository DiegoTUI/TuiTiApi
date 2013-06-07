/**
 * @author Diego Lafuente
 */

/**
 * Ajax class to manage connections.
 */

var ajax = new function () {
    // self-reference
    var self = this;

    /**
     * Function to submit data using Ajax, with instrumentation.
     * @param method: "GET" or "POST"
     * @param url: the url to call to
     * @param data: the data to send in the request
     * @param ok: function to call with data after a success.
     * @param nok: function to call with error object after a failure.
     * @param timeout: max time to wait for a response (miliseconds)
     */
    self.send = function(method, url, data, ok, nok, timeout)
    {
        var options = createOptions(method, url, data, ok, nok, timeout);
        if (!options) {
            return;
        }
        var request = new ajaxRequest(options);
        request.send();
    }
    
    /**
     * Create the options for the request, encapsulating all request data.
     * @param same as self.send
     * @return the options dictionary. Undefined if there is anything wrong.
     */
    function createOptions(method, url, data, ok, nok, timeout) {
        if (!checkCallback(ok, 'ok for ' + url + ' is not a function') ||
                !checkCallback(nok, 'nok for ' + url + ' is not a function')) {
            Ti.API.error(url);
            return;
        }
        if (!url)
        {
            nok('Invalid URL');
            return;
        }
        return {
            create: {
                timeout: timeout
            },
            ok: ok,
            nok: nok,
            method: method==="POST" ? "POST" : "GET",
            url: url,
            data: data
        }
    }
    
    /**
     * Check that the callback is null, or a function.
     * Returns true, or shows an error and returns false.
     * @param callback: the function to ckeck
     * @param message: the message to pop out in case of error
     * @return true if the callback is ok, false otherwise
     */
    function checkCallback(callback, message) {
        if (!callback)
        {
            return true;
        }
        if (typeof callback != 'function')
        {
            Ti.API.error(message);
            return false;
        }
        return true;
    }
    
    /**
     * Process the typical API result for multiple values through a callback or a pipeline.
     * The typical result has total, results, offset and values; for pagination. Only the values are used here.
     * For a single callback it is called with the values.
     * For a pipeline each function is called in order; if it returns a value it replaces the original.
     * @param callback: either an actual function or a pipeline (an array) of functions
     * @return a function that, when called, triggers the pipeline/callback
     */
    self.processValues = function(callback)
    {
        return function(data)
        {
            if (typeof callback == 'function')
            {
                callback(data.values);
                return;
            }
            self.runPipeline(callback, data.values);
        };
    }
    
    /**
     * Run a value through a pipeline of functions.
     * Each function in the pipeline has its turn to use or modify the data.
     * If a function returns a value, it substitutes the original data.
     * @param pipeline: an array of functions
     * @param data: the data to feed the pipeline with
     * @returns the data after the pipeline has been run
     */
    self.runPipeline = function(pipeline, data)
    {
        while (pipeline.length > 0)
        {
            var callback = pipeline.shift();
            if (!callback)
            {
                continue;
            }
            if (!self.checkCallback(callback, 'Wrong callback in pipeline'))
            {
                continue;
            }
            var result = callback(data);
            if (result)
            {
                data = result;
            }
        }
        return data;
    }
};

var ajaxRequest = function(options) {
     // self-reference
    var self = this;
    // config instance
    var config = require('api/util/config');
    // connection retries
    var retries = 0;
    
    /**
     * Send the ajax request (including retries)
     */
    self.send = function() {
        var request = Titanium.Network.createHTTPClient(options.create);
        request.onload = function() {
            Ti.API.info("Successful response for url " + options.url + ": " + request.responseText + " - " + JSON.stringify(arguments));
            options.ok(request.responseText);
        };
        request.onerror = function() {
            Ti.API.info("Error response for url " + options.url + ": " + JSON.stringify(arguments) + " - " + JSON.stringify(this));
            retries++;
            if (retries < config.MAX_CONNECTION_RETRIES) {
                Ti.API.info("retrying connection...");
                self.send();
            } else { 
                options.nok("Connection failed with status: " + this.status);
            }
        }
        request.open(options.method, options.url);
        Ti.API.info("about to call url: " + options.url + " with data: " + options.data);
        request.send(options.data);
    }
}

module.exports = ajax;
