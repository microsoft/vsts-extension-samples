/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Controls", "TFS/Build/Contracts"], function (require, exports, Controls, TFS_Build_Contracts) {
    var StatusSection = (function (_super) {
        __extends(StatusSection, _super);
        function StatusSection() {
            _super.call(this);
        }
        StatusSection.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            // Get configuration that's shared between extension and the extension host
            var sharedConfig = VSS.getConfiguration();
            if (sharedConfig) {
                // register your extension with host through callback
                sharedConfig.onBuildChanged(function (build) {
                    var buildId = build.id;
                    var imgSource = "images/none.jpg";
                    _this._element.find("#status-img").attr("src", imgSource);
                    _this._initBuildStatus(build);
                });
            }
        };
        StatusSection.prototype._initBuildStatus = function (build) {
            var imgSource = "images/none.jpg";
            this._element.find("#status-img").attr("src", imgSource);
            if (build.status === TFS_Build_Contracts.BuildStatus.InProgress) {
                imgSource = "images/running.jpg";
            }
            else if (build.status === TFS_Build_Contracts.BuildStatus.Completed) {
                if (build.result === TFS_Build_Contracts.BuildResult.Succeeded) {
                    imgSource = "images/success.jpg";
                }
                else if (build.result === TFS_Build_Contracts.BuildResult.Failed) {
                    imgSource = "images/fail.jpg";
                }
            }
            this._element.find("#status-img").attr("src", imgSource);
        };
        return StatusSection;
    })(Controls.BaseControl);
    exports.StatusSection = StatusSection;
    StatusSection.enhance(StatusSection, $(".build-status"), {});
    // Notify the parent frame that the host has been loaded
    VSS.notifyLoadSucceeded();
});
