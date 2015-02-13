var mediator = document.body;
//检测是否安装了插件
mediator.setAttribute("install-cross-origin-ajax-bridge",true);

mediator.addEventListener("request", function(e) {
    var req = e.detail.req;
    var tag = e.detail.tag;

    chrome.extension.sendRequest(req, function(response) {
        var event = new CustomEvent("response", {
            detail: {
                res: response,
                // req: req,
                tag: tag
            }
        });
        mediator.dispatchEvent(event);
    });

}, false);
