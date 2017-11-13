# Introduction 
The purpose of this example is to provide a working VSTS Widget Extension, exercising Charting and Analytics data, implemented in Typescript with a React UI model. It provides a configurable trend chart against work item tracking data, scoped to a project, team, work item type, with support for custom filtering of results.

![Illustration of Analytics widget, with chart and configuration view.](.\extend-analytics-widget.png)


# Getting Started
From the repo directory:

1. (Command Line) npm install
2. Override the publisher in vss-extension.json with your publisher Id. Learn to create a publisher.
3. (Command Line: Create your extension) tfx extension create --manifest-globs vss-extension.json --rev-version
4. Publish your extension from Marketplace
5. Share your extension to your test account
6. From your account, "Manage Extensions", select "Analytics example widget" and "Install" it

