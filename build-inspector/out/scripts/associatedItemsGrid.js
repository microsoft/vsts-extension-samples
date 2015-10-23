/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Controls", "VSS/Controls/Grids"], function (require, exports, Controls, Grids) {
    /**
     * This object will be draw the commits grid.
     */
    var AssociatedCommitsGrid = (function (_super) {
        __extends(AssociatedCommitsGrid, _super);
        function AssociatedCommitsGrid(options) {
            _super.call(this, options);
            this._selectedId = '';
        }
        /**
         *   Initialize called for each control.  Parse the passed in build nodes looking for commits.  Then pass those to
         *   grid to render
         */
        AssociatedCommitsGrid.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            var commitData = [];
            this._element.append($("<div/>").addClass("grid-caption").append("Associated Commits"));
            // Parse the nodes
            this._options.associatedChanges.forEach(function (change) {
                commitData.push({
                    "author": change.author.displayName,
                    "comment": change.message,
                    "commitId": change.id,
                    "commitDate": change.timestamp
                });
            });
            if (commitData.length === 0) {
                this._element.addClass('message-area-control info-message').text("No commits are associated with this build.");
            }
            else {
                // Create the grid with a few options.  One of which is the source data.
                Grids.Grid.createIn(this._element, {
                    height: "400px",
                    source: commitData,
                    columns: [
                        { text: "Date", index: "commitDate", width: 200 },
                        { text: "Author", index: "author", width: 140 },
                        { text: "Commit Id", index: "commitId", width: 270 },
                        { text: "Comment", index: "comment", width: 250 }
                    ]
                });
            }
        };
        return AssociatedCommitsGrid;
    })(Controls.Control);
    exports.AssociatedCommitsGrid = AssociatedCommitsGrid;
    /**
     * This object will be draw the work item grid.
     */
    var AssociatedWorkItemsGrid = (function (_super) {
        __extends(AssociatedWorkItemsGrid, _super);
        function AssociatedWorkItemsGrid(options) {
            _super.call(this, options);
            this._selectedId = '';
        }
        /**
         * Initialize called for each control.  Parse the passed in build nodes looking for work items.  Then pass those to
         * grid to render.
         */
        AssociatedWorkItemsGrid.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            var data = [];
            this._element.append($("<div/>").addClass("grid-caption").append("Associated Work Items"));
            this._options.associatedWorkItems.forEach(function (workItem) {
                data.push({
                    "workItemId": workItem.id,
                    "title": workItem.fields["System.Title"]
                });
            });
            if (data.length === 0) {
                this._element.addClass('message-area-control info-message').text("No work items are associated with this build.");
            }
            else {
                Grids.Grid.createIn(this._element, {
                    height: "400px",
                    source: data,
                    columns: [
                        { text: "Id", index: "workItemId", width: 100 },
                        { text: "Title", index: "title", width: 250 }
                    ]
                });
            }
        };
        return AssociatedWorkItemsGrid;
    })(Controls.Control);
    exports.AssociatedWorkItemsGrid = AssociatedWorkItemsGrid;
});
