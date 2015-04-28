/// <reference path='../VSS/References/VSS-Common.d.ts' />
/// <reference path='../VSS/VSS.SDK.d.ts' />

import Controls = require("VSS/Controls");
import Grids = require("VSS/Controls/Grids");

export interface AssociatedItemsGridOptions {
    associatedNodes: any[];
}

/**
 * This object will be draw the commits grid.
 */
export class AssociatedCommitsGrid extends Controls.BaseControl {
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

        // Parse the nodes
        this._options.associatedChanges.forEach((c: any) => {
            commitData.push({
				"author": c.author.displayName,
				"comment": c.message,
				"commitId": c.id,
				"commitDate": c.timestamp
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
export class AssociatedWorkItemsGrid extends Controls.BaseControl {
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
		
		// We converted this to build vNext and at this point you can not get associated work items.
		// Will add this back when work items are available
        
		//this._options.associatedNodes.forEach((c: any) => {
        //    if (c.type === "AssociatedWorkItem") {
        //       data.push({
        //            "workItemId": c.fields.WorkItemId,
        //            "title": c.fields.Title
        //        });
        //    }
        //});

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