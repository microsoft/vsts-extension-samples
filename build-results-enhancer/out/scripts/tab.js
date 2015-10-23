/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Controls"], function (require, exports, Controls) {
    var InfoTab = (function (_super) {
        __extends(InfoTab, _super);
        function InfoTab() {
            _super.call(this);
        }
        InfoTab.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            // Get configuration that's shared between extension and the extension host
            var sharedConfig = VSS.getConfiguration();
            var vsoContext = VSS.getWebContext();
            if (sharedConfig) {
                // register your extension with host through callback
                sharedConfig.onBuildChanged(function (build) {
                    _this._initBuildInfo(build);
                    /*
                    * If any task uploaded some data using ##vso[task.addattachment] (https://github.com/Microsoft/vso-agent-tasks/blob/master/docs/authoring/commands.md)
                    * Then you could consume the data using taskclient
                    * sample code -
                    */
                    // var taskClient = DT_Client.getClient();
                    // taskClient.getPlanAttachments(vsoContext.project.id, "build", build.orchestrationPlan.planId, "ATTACHMENT_TYPE_HERE").then((taskAttachments)=> {
                    // 	$.each(taskAttachments, (index, taskAttachment) => {
                    // 		if (taskAttachment._links && taskAttachment._links.self && taskAttachment._links.self.href) {
                    // 			var link = taskAttachment._links.self.href;
                    // 			var attachmentName = taskAttachment.name;
                    // 			// do some thing here
                    // 		}
                    // 	});
                    // });
                });
            }
        };
        InfoTab.prototype._initBuildInfo = function (build) {
        };
        return InfoTab;
    })(Controls.BaseControl);
    exports.InfoTab = InfoTab;
    InfoTab.enhance(InfoTab, $(".build-info"), {});
    // Notify the parent frame that the host has been loaded
    VSS.notifyLoadSucceeded();
});
