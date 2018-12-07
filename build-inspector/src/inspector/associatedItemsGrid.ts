import Controls = require("VSS/Controls");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Wit_Contracts = require("TFS/WorkItemTracking/Contracts");
import Grids = require("VSS/Controls/Grids");

export interface AssociatedItemsGridOptions {
    associatedWorkItems?: TFS_Wit_Contracts.WorkItem[];
    associatedChanges?: TFS_Build_Contracts.Change[];
}

/**
 * This object will be draw the commits grid.
 */
export class AssociatedCommitsGrid extends Controls.Control<AssociatedItemsGridOptions> {
    private _selectedId: string;

    constructor(options: AssociatedItemsGridOptions) {
        super(options);

        this._selectedId = '';
    }

    /**
     *   Initialize called for each control.  Parse the passed in build nodes looking for commits.  Then pass those to 
     *   grid to render
     */
    public initialize(): void {
        super.initialize();
        var commitData = [];
        this._element.append($("<div/>").addClass("grid-caption").append("Associated Commits"));

        // Parse the nodes
        this._options.associatedChanges.forEach((change: TFS_Build_Contracts.Change) => {
            commitData.push({
                "author": change.author.displayName,
                "comment": change.message,
                "commitId": change.id,
                "commitDate": change.timestamp
            });
        });

        if (commitData.length === 0) {
            this._element.addClass('message-area-control info-message').text("No commits are associated with this build.")
        } else {
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
    }
}

/**
 * This object will be draw the work item grid.
 */
export class AssociatedWorkItemsGrid extends Controls.Control<AssociatedItemsGridOptions> {
    private _selectedId: string;
    
    constructor(options: AssociatedItemsGridOptions) {
        super(options);

        this._selectedId = '';
    }

    /**
     * Initialize called for each control.  Parse the passed in build nodes looking for work items.  Then pass those to 
     * grid to render.
     */
    public initialize(): void {
        super.initialize();
        var data = [];
        this._element.append($("<div/>").addClass("grid-caption").append("Associated Work Items"));
        
        this._options.associatedWorkItems.forEach((workItem: TFS_Wit_Contracts.WorkItem) => {
            data.push({
                "workItemId": workItem.id,
                "title": workItem.fields["System.Title"]
            });
        });

        if (data.length === 0) {
            this._element.addClass('message-area-control info-message').text("No work items are associated with this build.");
        } else {
            Grids.Grid.createIn(this._element, {
                height: "400px",
                source: data,
                columns: [
                    { text: "Id", index: "workItemId", width: 100 },
                    { text: "Title", index: "title", width: 250 }
                ]
            });
        }
    }
}