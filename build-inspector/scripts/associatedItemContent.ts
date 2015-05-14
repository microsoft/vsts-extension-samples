/// <reference path='../VSS/References/VSS-Common.d.ts' />
/// <reference path='../VSS/VSS.SDK.d.ts' />

import VSS_Core = require("VSS/Utils/Core");
import VSS_Service = require("VSS/Service");
import Controls = require("VSS/Controls");
import GitHttpClient = require("TFS/VersionControl/GitRestClient");

export interface AssociatedItemContentOptions {
    associatedItem: any;
}

interface CommitUri {
    repositoryId: string;
    commitId: string;
}

/**
 * This object will be base object for rendering either a commit or a work item.
 */
export class AssociatedItemContent extends Controls.BaseControl {
   
    constructor(options: AssociatedItemContentOptions) {
        super(options);
    }

    /**
     * Initialize called when control is created.
     */
    public initialize(): void {
        super.initialize();
        this._decorate();
    }

    /**
     * This is a no op in the base.
     */
    public update(associatedItem: any): void {
       
    }

    /**
     * Start drawing the content.
     */
    private _decorate(): void {
        this._element.addClass('form-inline');
        this.update(this._options.associatedItem);
    }

    /**
     * Add the name/value pair
     */
    protected _addProperty = function (name: string, value: string): void {
        var container = $('<div></div>').addClass("form-pair");
        $('<div></div>').addClass("form-key").text(name).appendTo(container);
        $('<div></div>').addClass("form-value").text(value).appendTo(container);
        container.appendTo(this._element);
    }
}

/**
 * This object will render a specific commit.
 */
export class AssociatedCommitContent extends AssociatedItemContent {
    constructor(options) {
        super(options);
    }

    /**
     * Called when commit needs to be rendered.  A rest call is made to fetch the commit.
     */
    public update(associatedItem: any): void {
        this._element.empty();
        if (associatedItem) {
            var repoId  = this._parseRepo(associatedItem);
			var gitClient = VSS_Service.getCollectionClient(GitHttpClient.GitHttpClient);
			gitClient.getCommit(associatedItem.id, repoId).then((commit: any) => {
                this._addProperty("Commit Id", commit.commitId);
                this._addProperty("Comment", commit.comment);
                this._addProperty("Committer", commit.committer.name);
            });
        }
    }

    /**
     * Called to parse the git uri to get the repository id and commit id
     */
    private _parseRepo(associatedItem: any): string {
        var repoPrefix = "_apis/git/repositories",
            indexOfRepo = associatedItem.location.indexOf(repoPrefix);

        if (indexOfRepo > -1) {
            var repo =  associatedItem.location.substring(associatedItem.location.indexOf(repoPrefix) + repoPrefix.length+1);
			return repo.split("/")[0];
        }
        return '';
    }
}

export class AssociatedWorkItemContent extends AssociatedItemContent {
   /**
    *   This object will render a specific work item.
    */
    constructor(options: AssociatedItemContentOptions) {
        super(options);
    }

    /**
     *   Display a few work item fields after fetching the work item
     */
    public update(associatedItem): void {
        this._element.empty();
        if (associatedItem) {
			var url = VSS_Core.StringUtils.format("wit/workitems/{0}",  associatedItem.fields.WorkItemId);
            VSS.api(url, "collection", "GET", null, null, (workItem: any) => {
                this._addProperty("Area Path", workItem.fields["System.AreaPath"]);
                this._addProperty("Assigned To", workItem.fields["System.AssignedTo"]);
                this._addProperty("Title", workItem.fields["System.Title"]);
                this._addProperty("State", workItem.fields["System.State"]);
            });
        }
    }
}