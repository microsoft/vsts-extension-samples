/// <reference path='../VSS/References/VSS-Common.d.ts' />
/// <reference path='../VSS/References/VSS.SDK.Interfaces.d.ts' />
/// <reference path='../VSS/VSS.SDK.d.ts' />

import VSS_Host = require("VSS/Host");
import Controls = require("VSS/Controls");
import AssociatedItemsTree = require("Scripts/AssociatedItemsTree");
import AssociatedItemsGrid = require("Scripts/AssociatedItemsGrid");
import AssociatedItemContent = require("Scripts/AssociatedItemContent");
import TreeView = require("VSS/Controls/TreeView");

export interface AssociatedItemsViewOptions {
    build: any;
    associatedNodes: any;
}

/**
 * This object will be used to manage the tree view, grid view, and item content views.  It will listen to 
 * hash changed on the url and response
 */
export class AssociatedItemsView extends Controls.BaseControl {
    private _treeView: AssociatedItemsTree.AssociatedItemsTree;
    private _commitGrid: AssociatedItemsGrid.AssociatedCommitsGrid;
    private _workItemGrid: AssociatedItemsGrid.AssociatedWorkItemsGrid;
    private _commitContent: AssociatedItemContent.AssociatedCommitContent;
    private _workItemContent: AssociatedItemContent.AssociatedWorkItemContent;
    private _currentAction: string;
    private _currentId: string;

    public $commitGridContainer: JQuery;
    public $workItemGridContainer: JQuery;
    public $commitContentContainer: JQuery;
    public $workItemContentContainer: JQuery;

    constructor(options: AssociatedItemsViewOptions) {
        super(options);
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
    public initialize(): void {
        super.initialize();

        // Fetch jQuery objects for different content containers
        this.$commitGridContainer = this._element.find(".commit-grid-container");
        this.$workItemGridContainer = this._element.find(".workitem-grid-container");
        this.$commitContentContainer = this._element.find(".commit-content-container");
        this.$workItemContentContainer = this._element.find(".workitem-content-container");

        // Draw the tree and grid
        this._renderTree();
        this._renderGrid();

        VSS.getService<IHostHistoryService>("vss.history").then((historyService) => {

            // Attach to hash changed event.  This will happen when a tree node is clicked.
            historyService.onHashChanged((newHash: string) => {
                this.parseHash(newHash);
                this._updateView();
            });

            // Check the initial hash
            this.parseHash(historyService.getHash());
                
            // Update the views after parsing the hash
            this._updateView();
        });
    }

    /**
     * This is used to update the title on the hub content
     */
    private _setViewTitle(): void {
        var title = this._currentAction === 'commit' ? 'Associated Commits for Build: ' : 'Associated Work Items for Build: ';
        if (this._options.build){
            this._element.find('.hub-title').text(title + this._options.build.buildNumber);
        } else {
            this._element.find('.hub-title').text("Associated Build Data");
        }
    }

    /**
     * This is called to hide/show appropriate parts of UI based on hash.
     */
    private _updateView(): void {
        this._setViewTitle();
        this._treeView.update(this._currentAction, this._currentId);

        this.$workItemGridContainer.hide();
        this.$commitContentContainer.hide();
        this.$workItemContentContainer.hide();
        this.$commitGridContainer.hide();

        if (this._currentAction === 'commit' && this._currentId === 'commit') {
            this.$commitGridContainer.show();
        } else if (this._currentAction === 'workitem' && this._currentId === 'workitem') {
            this.$workItemGridContainer.show();
        } else if (this._currentAction === 'commit') {
            this.$commitContentContainer.show();
            this._renderCommitContent();
        } else {
            this.$workItemContentContainer.show();
            this._renderWorkItemContent();
        }
    }

    /**
     * This will be called to render commit of a specific commit node.
     */
    private _renderCommitContent(): void {
        if (!this._commitContent) {
            this._commitContent = <AssociatedItemContent.AssociatedCommitContent>AssociatedItemContent.AssociatedCommitContent.enhance(AssociatedItemContent.AssociatedCommitContent, this.$commitContentContainer, {
                associatedItem: this._treeView.getSelectedNode().tag
            });
        } else {
            this._commitContent.update(this._treeView.getSelectedNode().tag);
        }
    }

    /**
     * This will be called to render commit of a specific work item node.
     */
    private _renderWorkItemContent(): void {
        if (!this._workItemContent) {
            this._workItemContent = <AssociatedItemContent.AssociatedWorkItemContent>AssociatedItemContent.AssociatedWorkItemContent.enhance(AssociatedItemContent.AssociatedWorkItemContent, this.$workItemContentContainer, {
                associatedItem: this._treeView.getSelectedNode().tag
            });
        } else {
            this._workItemContent.update(this._treeView.getSelectedNode().tag);
        }
    }

    private _renderGrid(): void {
        this._commitGrid = <AssociatedItemsGrid.AssociatedCommitsGrid>AssociatedItemsGrid.AssociatedCommitsGrid.enhance(AssociatedItemsGrid.AssociatedCommitsGrid, this.$commitGridContainer, {
            associatedChanges: this._options.associatedChanges
        });

        this._workItemGrid = <AssociatedItemsGrid.AssociatedWorkItemsGrid>AssociatedItemsGrid.AssociatedWorkItemsGrid.enhance(AssociatedItemsGrid.AssociatedWorkItemsGrid, this.$workItemGridContainer, {
            associatedNodes: [] // cannot get work items from V2 yet
        });
    }

    /**
     * This creates the tree view.
     */
    private _renderTree(): void {
        // create the root tree nodes
        var commitNode = new TreeView.TreeNode("Commits");
        commitNode.link = VSS_Host.urlHelper.getFragmentActionLink("commit");
        commitNode.expanded = true;
        commitNode.id = AssociatedItemsTree.NodeItemType.commit;

        var workItemsNode = new TreeView.TreeNode("Workitems");
        workItemsNode.link = VSS_Host.urlHelper.getFragmentActionLink("workitem");
        workItemsNode.id = AssociatedItemsTree.NodeItemType.workItem;
        workItemsNode.expanded = true;

        // Process the build nodes to add to the appropriate root node
        this._options.associatedChanges.forEach(function (c) {
            var shortCommitId = c.id && c.id.length > 6 ? c.id.substr(0, 6) : c.id;
            var node = new TreeView.TreeNode(shortCommitId);
            node.tag = c;
            node.id = c.id;
            node.link = VSS_Host.urlHelper.getFragmentActionLink("commit", { id: c.id });
            commitNode.add(node);            
        });

        // Configure a few tree options
        var treeViewOptions = {
            width: "100%",
            height: "100%",
            nodes: [commitNode, workItemsNode]
        };

        // Create the tree
        this._treeView = <AssociatedItemsTree.AssociatedItemsTree>AssociatedItemsTree.AssociatedItemsTree.createIn($("#tree-container"), treeViewOptions);
    }

    /**
     * Parse the hash looking for current action and id.  Default to commit grid if nothing specified.
     */
    public parseHash(hash: string): void {
        var result = {};
        
        // If hash exists, parse it
        if (hash) {
            // decode each parameter
            var queryStringParams = hash.split("&");
            queryStringParams.forEach(function (val) {
                var param = val.split('=');
                result[decodeURIComponent(param[0])] = decodeURIComponent(param[1]);
            });
        }

        this._currentAction = result["_a"] || "commit";
        if (this._currentAction !== "commit" && this._currentAction !== "workitem") {
            this._currentAction = "commit";
        }
        this._currentId = result["id"] || this._currentAction;
    }
}