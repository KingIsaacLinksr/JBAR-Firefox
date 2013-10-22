(function () {
    'use strict';
    var urlChangeListener = {
            onLocationChange: function (aWebProgress, aRequest, aLocation) {
                var url, tag, win;
                var configurations = {
                        amazon : {
                            rx: /^http.*?\.amazon\.com.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "tekno09-20" }
                            ]
                        },
                        amazonuk : {
                            rx: /^http.*?\.amazon\.co\.uk.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "tekno-21" }
                            ]
                        },
                        amazonde : { 
                            rx: /^http.*?\.amazon\.de.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "tekno03-21" }
                            ]
                        },
                        amazonfr : { 
                            rx: /^http.*?\.amazon\.fr.*?(\/dp\/|\/o\/asin\/|\/exec\/obidos\/tg\/detail\/|\/gp\/product\/)/i,
                            params: [
                                { param: "tag", paramValue: "tekno0b-21" }
                            ]
                        },
                    };

                function createTag(params) {
                    var result = "", i;
                    for (i = 0; i < params.length; i++) {
                        result = result + params[i].param + "=" + params[i].paramValue;
                        if (i >= 0 && i < params.length - 1) {
                            result = result + "&";
                        }
                    }
                    return result;
                }
                
                if (aLocation) {
                    url = aLocation.spec;
                    tag = null;
                    var config;
                    for (config in configurations) {
                        if (configurations.hasOwnProperty(config)) {
                            if (url.match(configurations[config].rx)) {
                                //gracefully acknowledge existing affiliate tags
                                if (url.indexOf(configurations[config].params[0].param) === -1) {
                                    win = aWebProgress.DOMWindow;
                                    win.document.location.replace(url + (url.indexOf("?") >= 0 ? "&" : "?") + createTag(configurations[config].params));
                                    break;
                                }
                            }
                        }
                    }
                }
            },
            //onProgressChange: function(webProgress, request, curSelfProgress,maxSelfProgress, curTotalProgress, maxTotalProgress) {},
            //onSecurityChange: function(webProgress, request, state) {},
            //OnStateChange: function(webProgress, request, stateFlags, status) {},
            //onStatusChange: function(webProgress, request, status, message) {},
            QueryInterface: function (iid) {
                if (!iid.equals(Components.interfaces.nsISupports) && !Iid.equals(Components.interfaces.nsIWebProgressListener)) {
                    throw Components.results.NS_ERROR_NO_INTERFACE;
                }
                return this;
            }
    };

    window.getBrowser().addProgressListener(urlChangeListener, Components.interfaces.nsIWebProgress.NOTIFY_STATE_DOCUMENT);
}());
