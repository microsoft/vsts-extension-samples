var contentRenderer = (function () {
    "use strict";
    return {
        renderContent: function(rawContent, options) {
            var rendered = document.getElementById('content-display');
            rendered.textContent = rawContent;
        }
    };
}());

VSS.init({
    usePlatformScripts: true, 
    usePlatformStyles: true, 
    explicitNotifyLoaded: true 
});

VSS.ready(function () {
    VSS.register("showRenderer", function (context) {
        return contentRenderer;
    });

    VSS.notifyLoadSucceeded();
});