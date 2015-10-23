/// <reference path='../../lib/vss' />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "VSS/Controls/TreeView"], function (require, exports, TreeView) {
    var AssociatedItemsTree = (function (_super) {
        __extends(AssociatedItemsTree, _super);
        /**
         * This extends the base tree control.  it will draw the associated items tree.
         */
        function AssociatedItemsTree(options) {
            _super.call(this, options);
        }
        /**
         * Override the onItemClick of base tree control so that we can update the url hash.
         * But make sure to call onItemClick of the base in order to complete selection process in tree.
         */
        AssociatedItemsTree.prototype.onItemClick = function (node, nodeElement, e) {
            _super.prototype.onItemClick.apply(this, arguments);
            VSS.getService("ms.vss-web.navigation-service").then(function (historyService) {
                historyService.setHash(node.link);
            });
        };
        /**
         * This will update the tree and select the node with the specified id.
         */
        AssociatedItemsTree.prototype.update = function (action, id) {
            var $nodeElement;
            if (this._selectedId !== id) {
                this._selectedId = id || "";
                $nodeElement = this._element.find("li.node[data-id='" + this._selectedId + "']").first();
                if ($nodeElement.length > 0) {
                    this.setSelectedNode(this._getNode($nodeElement));
                }
            }
        };
        /**
         * Override the _updateNode of base tree control. This will set a property
         * that we will use to located the
         */
        AssociatedItemsTree.prototype._updateNode = function (li, node, level) {
            _super.prototype._updateNode.call(this, li, node, level);
            if (typeof node.id !== "undefined") {
                li.attr("data-id", node.id === 1 /* commit */ ? "commit" : (node.id === 2 /* workItem */ ? "workitem" : "overview"));
            }
        };
        return AssociatedItemsTree;
    })(TreeView.TreeView);
    exports.AssociatedItemsTree = AssociatedItemsTree;
});
