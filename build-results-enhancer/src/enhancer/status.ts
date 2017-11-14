import Controls = require("VSS/Controls");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Extension_Contracts = require("TFS/Build/ExtensionContracts");

export class StatusSection extends Controls.BaseControl {	
	constructor() {
		super();
	}
		
	public initialize(): void {
		super.initialize();
		// Get configuration that's shared between extension and the extension host
		var sharedConfig: TFS_Build_Extension_Contracts.IBuildResultsViewExtensionConfig = VSS.getConfiguration();
		if(sharedConfig) {
			// register your extension with host through callback
			sharedConfig.onBuildChanged((build: TFS_Build_Contracts.Build) => {
				var buildId = build.id;
				var imgSource = "images/none.jpg";
				this._element.find("#status-img").attr("src", imgSource);
				this._initBuildStatus(build);
			});
		}		
	}
	
	private _initBuildStatus(build: TFS_Build_Contracts.Build) {
		var imgSource = "images/none.jpg";
		this._element.find("#status-img").attr("src", imgSource);
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
		this._element.find("#status-img").attr("src", imgSource);
	}
}

StatusSection.enhance(StatusSection, $(".build-status"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();

	
