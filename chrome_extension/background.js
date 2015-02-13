chrome.extension.onRequest.addListener(
    function(req, sender, sendResponse) {
        var _req = $.extend(req, {
            success: function(data) {
                sendResponse({
                    'data': data,
                    'isSucc': true
                });
            },
            error: function(xhr, type) {
                sendResponse({
                    'xhr': xhr,
                    'type': type,
                    'isSucc': false
                });
            }
        });
        $.ajax(_req);
    }
);
