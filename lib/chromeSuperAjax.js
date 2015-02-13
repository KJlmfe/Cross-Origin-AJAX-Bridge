var ChromeSuperAjax = (function() {
    var mediator = document.body;
    var ajaxDict = {};

    var getAvailableTag = function() {
        var tag = Math.floor(Math.random() * 100);
        if (!ajaxDict[tag]) {
            return tag;
        } else {
            return getAvailableTag();
        }
    }

    mediator.addEventListener("response", function(e) {
        var req = ajaxDict[e.detail.tag];
        ajaxDict[e.detail.tag] = false;
        var res = e.detail.res;
        if (res.isSucc) {
            req.success && req.success(res.data);
        } else {
            req.error && req.error(res.xhr, res.type);
        }
    }, false);

    var AJAX = function(req) {
        req._tag = getAvailableTag();
        ajaxDict[req._tag] = req;

        var _req = {
            type: req.type ? req.type : 'GET',
            url: req.url,
            data: req.data ? req.data : {},
            timeout: req.timeout ? req.timeout : 5000,
            dataType: req.dataType ? req.dataType : 'json',
        };
        var event = new CustomEvent("request", {
            detail: {
                req: _req,
                tag: req._tag
            }
        });
        mediator.dispatchEvent(event);
    };

    AJAX.isInstallExtension = function() {
        return mediator.getAttribute("install-cross-origin-ajax-bridge") == "true" ? true : false;
    }

    return AJAX;

})();
