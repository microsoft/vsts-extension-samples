/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Controls", "TFS/VersionControl/GitRestClient", "TFS/WorkItemTracking/RestClient"], function (require, exports, Controls, GitHttpClient, WitClient) {
    /**
     * This object will be base object for rendering either a commit or a work item.
     */
    var AssociatedItemContent = (function (_super) {
        __extends(AssociatedItemContent, _super);
        function AssociatedItemContent(options) {
            _super.call(this, options);
            /**
             * Add the name/value pair
             */
            this._addProperty = function (name, value) {
                var container = $('<div></div>').addClass("form-pair");
                $('<div></div>').addClass("form-key").text(name).appendTo(container);
                $('<div></div>').addClass("form-value").text(value).appendTo(container);
                container.appendTo(this._element);
            };
        }
        /**
         * Initialize called when control is created.
         */
        AssociatedItemContent.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._decorate();
        };
        /**
         * This is a no op in the base.
         */
        AssociatedItemContent.prototype.update = function (associatedItem) {
        };
        /**
         * Start drawing the content.
         */
        AssociatedItemContent.prototype._decorate = function () {
            this._element.addClass('form-inline');
            this.update(this._options.associatedItem);
        };
        return AssociatedItemContent;
    })(Controls.Control);
    exports.AssociatedItemContent = AssociatedItemContent;
    /**
     * This object will render a specific commit.
     */
    var AssociatedCommitContent = (function (_super) {
        __extends(AssociatedCommitContent, _super);
        function AssociatedCommitContent(options) {
            _super.call(this, options);
        }
        /**
         * Called when commit needs to be rendered.  A rest call is made to fetch the commit.
         */
        AssociatedCommitContent.prototype.update = function (associatedItem) {
            var _this = this;
            this._element.empty();
            if (associatedItem) {
                var repoId = this._parseRepo(associatedItem);
                var gitClient = GitHttpClient.getClient();
                gitClient.getCommit(associatedItem.id, repoId).then(function (commit) {
                    _this._addProperty("Commit Id", commit.commitId);
                    _this._addProperty("Comment", commit.comment);
                    _this._addProperty("Committer", commit.committer.name);
                });
            }
        };
        /**
         * Called to parse the git uri to get the repository id and commit id
         */
        AssociatedCommitContent.prototype._parseRepo = function (associatedItem) {
            var repoPrefix = "_apis/git/repositories", indexOfRepo = associatedItem.location.indexOf(repoPrefix);
            if (indexOfRepo > -1) {
                var repo = associatedItem.location.substring(associatedItem.location.indexOf(repoPrefix) + repoPrefix.length + 1);
                return repo.split("/")[0];
            }
            return '';
        };
        return AssociatedCommitContent;
    })(AssociatedItemContent);
    exports.AssociatedCommitContent = AssociatedCommitContent;
    var AssociatedWorkItemContent = (function (_super) {
        __extends(AssociatedWorkItemContent, _super);
        /**
         *   This object will render a specific work item.
         */
        function AssociatedWorkItemContent(options) {
            _super.call(this, options);
        }
        /**
         *   Display a few work item fields after fetching the work item
         */
        AssociatedWorkItemContent.prototype.update = function (associatedItem) {
            var _this = this;
            this._element.empty();
            if (associatedItem) {
                var witClient = WitClient.getClient();
                witClient.getWorkItem(associatedItem.id).then(function (workItem) {
                    _this._addProperty("Area Path", workItem.fields["System.AreaPath"]);
                    _this._addProperty("Assigned To", workItem.fields["System.AssignedTo"]);
                    _this._addProperty("Title", workItem.fields["System.Title"]);
                    _this._addProperty("State", workItem.fields["System.State"]);
                });
            }
        };
        return AssociatedWorkItemContent;
    })(AssociatedItemContent);
    exports.AssociatedWorkItemContent = AssociatedWorkItemContent;
});
