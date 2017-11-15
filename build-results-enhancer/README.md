# Build Results Enhancer
This sample extension shows how to make a tab/section contribution to build summary page, while reacting to build updates.
This also has a sample code that allows user to render custom data results uploaded from a particular task in build.

You could contribute to build results view in different ways:
* As a section to any of your own contributed tab for build results view
* As a section to the existing "summary" tab in build results view
* As a tab to the build results view

# Targets
* **ms.vss-build-web.build-results-view**: To contribute to build results/details view
* **ms.vss-build-web.build-results-summary-tab**: To contribute to the summary view on build results/details view

# Types
* **ms.vss-build-web.build-results-tab**: To contribute as a tab to build results/details view
* **ms.vss-build-web.build-results-section**: To contribute as a section to tab targets

# Properties
* **name**: Display name for the contribution
* **uri**: Content
* **order** (*Warning: Will be deprecated soon*): Determines where to place the contribution
* **height**: Optional, custom height in pixels
* **supportsTasks**: You can control the visibility of a contribution using task constraints.
    * **id**: This should point to the task `id` from `task.json`, which is a GUID. You can see all existing tasks [here](https://github.com/Microsoft/vsts-tasks)

# Getting Started
From the the extension directory:
1. (Command Line) npm install
2. (Command Line) npm run build
3. (Command Line: Automatically rev version and mention publisher for testing:) tfx extension create --publisher fabrikam --rev-version
3. (Command Line: Using json instead:) tfx extension create --manifest-globs vss-extension.json

# More Information
* [Using Auth](https://www.visualstudio.com/en-us/docs/report/analytics/building-extension-against-analytics-service)
* [Building extensions](https://docs.microsoft.com/en-us/vsts/extend/)
* [Write your first extension](https://docs.microsoft.com/en-us/vsts/extend/get-started/node)
* [Installing extensions](https://docs.microsoft.com/en-us/vsts/marketplace/install-vsts-extension)
* [Upload custom data to tasks](https://github.com/Microsoft/vso-agent-tasks/blob/master/docs/authoring/commands.md)
* [Building task extensions](https://docs.microsoft.com/en-us/vsts/extend/develop/build-task-schema)
* [Task and template through extension sample](https://github.com/Microsoft/vsts-extension-samples/tree/master/fabrikam-build-extension)