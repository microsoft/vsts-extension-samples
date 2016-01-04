var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

define([
	"require",
	"exports",
	"VSS/Utils/Core",
	"VSS/Controls",
	"VSS/Controls/Menus",
	"VSS/Controls/Grids"
	], function (require, exports, Core, Controls, MenuControls, Grids) {

    var ItemsView = (function (_super) {
        __extends(ItemsView , _super);
        function ItemsView(options) {
            _super.call(this, options);

            this._grid = null;
        }

       /**
        *   Initialize will be called when this control is created.  This will setup the UI, 
        *   attach to events, etc.
        */
        ItemsView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);

            var gridOptions = {
			   height: "100%",
			   width: "90%",
			   source: function () {
				   var result = [], i;
				   for (i = 0; i < 100; i++) {
					   result[result.length] = [i, "Column 2 text" + i, "Column 3 " + Math.random()];
				   }

				   return result;
			   } (),
			   columns: [
				   { text: "Column 1", index: 0, width: 50 },
				   { text: "Column 2", index: 1, width: 200, canSortBy: false },
				   { text: "Column 3", index: 2, width: 450 }],
				gutter: {
                    contextMenu: true
                },
				contextMenu: {
                    items: this._createToolbarItems.bind(this),
                    executeAction: this._onMenuItemClick.bind(this)
                }
		   };
			
			var container = this._element.find("div.right-hub-content");
			this._grid = Controls.BaseControl.createIn(Grids.Grid, container, gridOptions);
        };
		
		
		ItemsView.prototype._createToolbarItems = function () {
            return [
				{ id: "refresh-items", title: "Refresh", icon: "icon-refresh", showText: false, groupId: "icon" },
				{ id: "clear-items", text: "Clear", title: "Clear", showText: true, noIcon: true, groupId: "text" },
				{ id: "start-items", text: "Start", title: "Start", showText: true, noIcon: true, disabled: true, groupId: "text" },
				{ id: "stop-items", text: "Stop", title: "Stop", showText: true, noIcon: true, disabled: true, groupId: "text" },
				{ id: "help-items", text: "Help", title: "Help", showText: true, noIcon: true, groupId: "text" }
			];
        };
		
		ItemsView.prototype._refreshItems = function(data){
			alert("refresh: "+data);
		};
		
		ItemsView.prototype._clearItems = function(){
			alert("clear");
		};

        ItemsView.prototype._onMenuItemClick = function (e) {
            var command = e._commandName;
			var data = this._grid.getRowData(this._grid.getSelectedDataIndex());
			switch (command) {
				case "refresh-items":
					this._refreshItems(data[0]);
					break;
				case "clear-items":
					this._clearItems();
					break;
				case "start-items":
					alert("start");
					break;
				case "stop-items":
					alert("stop");
					break;
				case "help-items":
					alert("help");
					break;
				default:
					result = true;
					break;
			}
			
        };
		
        return ItemsView;
    })(Controls.BaseControl);
    exports.ItemsView = ItemsView;
	
	Controls.Enhancement.registerEnhancement(ItemsView, ".hub-view");
});