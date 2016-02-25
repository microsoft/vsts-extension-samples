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
	"VSS/Controls/Menus"
	], function (require, exports, Core, Controls, MenuControls) {

    var ItemsView = (function (_super) {
        __extends(ItemsView , _super);
        function ItemsView(options) {
            _super.call(this, options);

            this._menu = null;
        }

        /**
         * Initialize will be called when this control is created.  This will setup the UI, 
         * attach to events, etc.
         */
        ItemsView.prototype.initialize = function () {
            _super.prototype.initialize.call(this);

            this._createToolbar();
        };
		
		ItemsView.prototype._createToolbar = function () {
            this._menu = Controls.create(MenuControls.MenuBar, this._element.find("div.menu-container"), {
                items: this._createToolbarItems()
            });
            MenuControls.menuManager.attachExecuteCommand(this._onToolbarItemClick.bind(this));
        };
		
		ItemsView.prototype._createToolbarItems = function () {
            return [
				{ id: "refresh-items", title: "Refresh", icon: "icon-refresh", showText: false, groupId: "icons" },
				{ id: "clear-items", text: "Clear", title: "Clear", showText: true, noIcon: true, groupId: "text" },
				{ id: "start-items", text: "Start", title: "Start", showText: true, noIcon: true, disabled: true, groupId: "text" },
				{ id: "stop-items", text: "Stop", title: "Stop", showText: true, noIcon: true, disabled: true, groupId: "text" },
				{ id: "help-items", text: "Help", title: "Help", showText: true, noIcon: true, groupId: "text" }
			];
        };
		
		ItemsView.prototype._refreshItems = function(){
			alert("refresh");
		};
		
		ItemsView.prototype._clearItems = function(){
			alert("clear");
		};

        ItemsView.prototype._onToolbarItemClick = function (sender, args) {
            var command = args.get_commandName(), commandArgument = args.get_commandArgument(), that = this, result = false;
			switch (command) {
				case "refresh-items":
					this._refreshItems();
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
			return result;
        };
		
        return ItemsView;
    })(Controls.BaseControl);
    exports.ItemsView = ItemsView;
	
	Controls.Enhancement.registerEnhancement(ItemsView, ".hub-view");
});