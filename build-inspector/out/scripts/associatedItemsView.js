/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Navigation/Services", "VSS/Controls", "scripts/associatedItemsTree", "scripts/associatedItemsGrid", "scripts/associatedItemContent", "VSS/Controls/TreeView"], function (require, exports, NavigationServices, Controls, AssociatedItemsTree, AssociatedItemsGrid, AssociatedItemContent, TreeView) {
    /**
     * This object will be used to manage the tree view, grid view, and item content views.  It will listen to
     * hash changed on the url and response
     */
    var AssociatedItemsView = (function (_super) {
        __extends(AssociatedItemsView, _super);
        function AssociatedItemsView(options) {
            _super.call(this, options);
            this._treeView = null;
            this._commitGrid = null;
            this._workItemGrid = null;
            this._commitContent = null;
            this._workItemContent = null;
            this._currentAction = null;
            this._currentId = null;
        }
        /**
         * Initialize will be called when this control is created.  This will setup the UI,
         * attach to events, etc.
         */
        AssociatedItemsView.prototype.initialize = function () {
            var _this = this;
            _super.prototype.initialize.call(this);
            // Fetch jQuery objects for different content containers
            this.$commitGridContainer = this._element.find(".commit-grid-container");
            this.$workItemGridContainer = this._element.find(".workitem-grid-container");
            this.$commitContentContainer = this._element.find(".commit-content-container");
            this.$workItemContentContainer = this._element.find(".workitem-content-container");
            // Draw the tree and grid
            this._renderTree();
            this._renderGrid();
            VSS.getService("ms.vss-web.navigation-service").then(function (historyService) {
                // Attach to hash changed event.  This will happen when a tree node is clicked.
                historyService.onHashChanged(function (newHash) {
                    _this.parseHash(newHash);
                    _this._updateView();
                });
                // Check the initial hash
                historyService.getHash().then(function (hash) {
                    _this.parseHash(hash);
                    _this._updateView();
                });
            });
        };
        /**
         * This is used to update the title on the hub content
         */
        AssociatedItemsView.prototype._setViewTitle = function () {
            var title;
            switch (this._currentAction) {
                case "commit":
                    title = "Associated Commits for Build: ";
                    break;
                case "workitem":
                    title = "Associated Work Items for Build: ";
                    break;
                default:
                    title = "Overview for Build: ";
            }
            if (this._options.build) {
                this._element.find('.hub-title').text(title + this._options.build.buildNumber);
            }
            else {
                this._element.find('.hub-title').text("Associated Build Data");
            }
        };
        /**
         * This is called to hide/show appropriate parts of UI based on hash.
         */
        AssociatedItemsView.prototype._updateView = function () {
            this._setViewTitle();
            this._treeView.update(this._currentAction, this._currentId);
            this.$workItemGridContainer.hide();
            this.$commitContentContainer.hide();
            this.$workItemContentContainer.hide();
            this.$commitGridContainer.hide();
            if (this._currentAction === "overview") {
                this.$commitGridContainer.show();
                this.$workItemGridContainer.show();
            }
            else if (this._currentAction === 'commit' && this._currentId === 'commit') {
                this.$commitGridContainer.show();
            }
            else if (this._currentAction === 'workitem' && this._currentId === 'workitem') {
                this.$workItemGridContainer.show();
            }
            else if (this._currentAction === 'commit') {
                this.$commitContentContainer.show();
                this._renderCommitContent();
            }
            else {
                this.$workItemContentContainer.show();
                this._renderWorkItemContent();
            }
        };
        /**
         * This will be called to render commit of a specific commit node.
         */
        AssociatedItemsView.prototype._renderCommitContent = function () {
            if (!this._commitContent) {
                this._commitContent = Controls.create(AssociatedItemContent.AssociatedCommitContent, this.$commitContentContainer, {
                    associatedItem: this._treeView.getSelectedNode().tag
                });
            }
            else {
                this._commitContent.update(this._treeView.getSelectedNode().tag);
            }
        };
        /**
         * This will be called to render commit of a specific work item node.
         */
        AssociatedItemsView.prototype._renderWorkItemContent = function () {
            if (!this._workItemContent) {
                this._workItemContent = Controls.create(AssociatedItemContent.AssociatedWorkItemContent, this.$workItemContentContainer, {
                    associatedItem: this._treeView.getSelectedNode().tag
                });
            }
            else {
                this._workItemContent.update(this._treeView.getSelectedNode().tag);
            }
        };
        AssociatedItemsView.prototype._renderGrid = function () {
            this._commitGrid = Controls.create(AssociatedItemsGrid.AssociatedCommitsGrid, this.$commitGridContainer, {
                associatedChanges: this._options.associatedChanges
            });
            this._workItemGrid = Controls.create(AssociatedItemsGrid.AssociatedWorkItemsGrid, this.$workItemGridContainer, {
                associatedWorkItems: this._options.associatedWorkItems
            });
        };
        /**
         * This creates the tree view.
         */
        AssociatedItemsView.prototype._renderTree = function () {
            // create the root tree nodes
            var historySvc = NavigationServices.getHistoryService();
            var overviewNode = new TreeView.TreeNode("Overview");
            overviewNode.link = historySvc.getFragmentActionLink("overview");
            overviewNode.id = 0 /* overview */;
            var commitNode = new TreeView.TreeNode("Commits");
            commitNode.link = historySvc.getFragmentActionLink("commit");
            commitNode.expanded = true;
            commitNode.id = 1 /* commit */;
            var workItemsNode = new TreeView.TreeNode("Workitems");
            workItemsNode.link = historySvc.getFragmentActionLink("workitem");
            workItemsNode.id = 2 /* workItem */;
            workItemsNode.expanded = true;
            // Process the build nodes to add to the appropriate root node
            this._options.associatedChanges.forEach(function (change) {
                var shortCommitId = change.id && change.id.length > 6 ? change.id.substr(0, 6) : change.id;
                var node = new TreeView.TreeNode(shortCommitId);
                node.tag = change;
                node.id = parseInt(change.id);
                node.link = historySvc.getFragmentActionLink("commit", { id: change.id });
                commitNode.add(node);
            });
            // Process the build nodes to add to the appropriate root node
            this._options.associatedWorkItems.forEach(function (workItem) {
                var workItemId = workItem.id;
                var node = new TreeView.TreeNode(workItemId.toString());
                node.tag = workItem;
                node.link = historySvc.getFragmentActionLink("workitem", { id: workItem.id });
                workItemsNode.add(node);
            });
            // Configure a few tree options
            var treeViewOptions = {
                width: "100%",
                height: "100%",
                nodes: [overviewNode, commitNode, workItemsNode]
            };
            // Create the tree
            this._treeView = Controls.create(AssociatedItemsTree.AssociatedItemsTree, $("#tree-container"), treeViewOptions);
        };
        /**
         * Parse the hash looking for current action and id.  Default to commit grid if nothing specified.
         */
        AssociatedItemsView.prototype.parseHash = function (hash) {
            var result = {};
            // If hash exists, parse it
            if (hash && Object.keys(hash).length > 0) {
                // decode each parameter
                var queryStringParams = hash.split("&");
                queryStringParams.forEach(function (val) {
                    var param = val.split('=');
                    result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
                });
            }
            this._currentAction = result["_a"] || "overview";
            if (this._currentAction !== "commit" && this._currentAction !== "workitem" && this._currentAction !== "overview") {
                this._currentAction = "overview";
            }
            this._currentId = result["id"] || this._currentAction;
        };
        return AssociatedItemsView;
    })(Controls.Control);
    exports.AssociatedItemsView = AssociatedItemsView;
});
