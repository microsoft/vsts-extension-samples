import Controls = require("VSS/Controls");
import VSS_Service = require("VSS/Service");
import TFS_Build_Contracts = require("TFS/Build/Contracts");
import TFS_Build_Extension_Contracts = require("TFS/Build/ExtensionContracts");

export class BuildDumpSection extends Controls.BaseControl {	
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
				this._initBuildDump(build);
			});
		}
	}
	
	private _initBuildDump(build: TFS_Build_Contracts.Build) {
		var element = $("<pre />");
		element.text(JSON.stringify(build, null, 2));
		this._element.append(element);
	}
}

BuildDumpSection.enhance(BuildDumpSection, $(".build-dump"), {});

// Notify the parent frame that the host has been loaded
VSS.notifyLoadSucceeded();

	