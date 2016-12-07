import Controls = require("VSS/Controls");
import TreeView = require("VSS/Controls/TreeView");

export const enum NodeItemType {
    overview,
    commit,
    workItem
}

export interface AssociatedItemsTreeOptions {

}

export class AssociatedItemsTree extends TreeView.TreeView {

    private _selectedId: string;

    /**
     * This extends the base tree control.  it will draw the associated items tree.
     */
    constructor(options: AssociatedItemsTreeOptions) {
        super(options);
    }

    /**
     * Override the onItemClick of base tree control so that we can update the url hash.
     * But make sure to call onItemClick of the base in order to complete selection process in tree.
     */
    public onItemClick(node: TreeView.TreeNode, nodeElement: any, e?: JQueryEventObject): void {
        super.onItemClick.apply(this, arguments);
        VSS.getService<IHostNavigationService>("ms.vss-web.navigation-service").then((historyService) => {
            historyService.setHash(node.link);
        });
    }

    /**
     * This will update the tree and select the node with the specified id.
     */
    public update(action: string, id: string): void {
        var $nodeElement;
        if (this._selectedId !== id) {
            this._selectedId = id || "";

            $nodeElement = this._element.find("li.node[data-id='" + this._selectedId + "']").first();
            if ($nodeElement.length > 0) {
                this.setSelectedNode(this._getNode($nodeElement));
            }
        }
    }

    /**
     * Override the _updateNode of base tree control. This will set a property
     * that we will use to located the 
     */
    public _updateNode(li: JQuery, node: TreeView.TreeNode, level: number): void {
        super._updateNode(li, node, level);

        if (typeof node.id !== "undefined") {
            li.attr("data-id", node.id === NodeItemType.commit ? "commit" : (node.id === NodeItemType.workItem ? "workitem" : "overview"));
        }
    }
}