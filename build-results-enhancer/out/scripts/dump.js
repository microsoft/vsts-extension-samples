/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Controls"], function (require, exports, Controls) {
    var BuildDumpSection = (function (_super) {
        __extends(BuildDumpSection, _super);
        function BuildDumpSection() {
            _super.call(this);
        }
        BuildDumpSection.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            // Get configuration that's shared between extension and the extension host
            var sharedConfig = VSS.getConfiguration();
            if (sharedConfig) {
                // register your extension with host through callback
                sharedConfig.onBuildChanged(function (build) {
                    _this._initBuildDump(build);
                });
            }
        };
        BuildDumpSection.prototype._initBuildDump = function (build) {
            var span = $("<span />");
            span.text(JSON.stringify(build));
            this._element.append(span);
        };
        return BuildDumpSection;
    })(Controls.BaseControl);
    exports.BuildDumpSection = BuildDumpSection;
    BuildDumpSection.enhance(BuildDumpSection, $(".build-dump"), {});
    // Notify the parent frame that the host has been loaded
    VSS.notifyLoadSucceeded();
});
