/// <reference path='../../lib/vss' />

import Controls = require("VSS/Controls");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");

export class ResultView extends Controls.BaseControl {	
	public $statusElement: JQuery;
	constructor() {
        super();       
    }
	
	public initialize(): void {
		super.initialize();
		this.$statusElement = this._element.find(".build-status");
		// Get configuration that's shared between extension and the extension host
		var sharedConfig = VSS.getConfiguration();
		if(sharedConfig) {
			// callback added via 'addBuildCallBack' is called whenever there are any build changes
			// More than one callbacks can be added, and all will be called
			// It is important to have atleast one call back, since that's how an extension can get information about the current build it has to deal with
			sharedConfig.addBuildCallBack((build: TFS_Build_Contracts.Build) => {
				var buildId = build.id;
				var imgSource = "images/none.jpg";
				this.$statusElement.find("#status-img").attr("src", imgSource);
				this._initBuildStatus(build);				
			});
		}
		
		
		
	}
	
	private _initBuildStatus(build: TFS_Build_Contracts.Build) {
		var imgSource = "images/none.jpg";
		this.$statusElement.find("#status-img").attr("src", imgSource);		
		if(build.status === TFS_Build_Contracts.BuildStatus.InProgress) {
			imgSource = "images/running.jpg";	
		}
		else if(build.status === TFS_Build_Contracts.BuildStatus.Completed) {			
			if(build.result === TFS_Build_Contracts.BuildResult.Succeeded) {
				imgSource = "images/success.jpg";
			}
			else if(build.result === TFS_Build_Contracts.BuildResult.Failed) {			
				imgSource = "images/fail.jpg";				
			}						
		}
		this.$statusElement.find("#status-img").attr("src", imgSource);
	}
}

ResultView.enhance(ResultView, $(".task-summary"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();

	