# Team Services Office UI Fabric React Sample

A sample extension for Visual Studio Team Services using [Office UI Fabric React](http://dev.office.com/fabric#/components).

It uses components like TextField, Button, Checkbox and DetailsList to search for work items and list the results.

## Prerequisites

If you plan to build and install this extension, you need:

* [Node.js](https://nodejs.org) (install with npm)

## Try it

After cloning this sample extension, run:

* ```npm install``` (to pull down required dependencies)

### Update publisher ID

To run the extension, you need to publish it. This requires having a publisher on the Visual Studio Marketplace that you can publish under.

1. [Get a publisher ID](https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/overview)
2. Update the `publisher` property in `manifests/base.json` with your publisher ID. For example:
    ```"publisher": "my-publisher-id"```

### Deployment modes

You can run this sample in two modes: local or bundled. Bundled is the easiest since it doesn't require a local web server.

#### Local web server mode

During development it can be faster to run your own web server on your local machine. To go this route:

1. Update the `baseUri` property in `manifests/local.json` to point to your local web server. For example: `http://mymachine:8080/ui-officefabric`.
2. Run ```node_modules/.bin/gulp --local``` to create a .vsix for the extension
3. [Publish the extension](https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/overview) to the Visual Studio Marketplace (or your local Team Foundation Server)

#### Bundled mode

ITo create a self-contained extension package (.vsix file) containing all the scripts and files needed by the extension:

1. Run ```node_modules/.bin/gulp``` to create a .vsix for your extension
2. [Publish the extension](https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/overview) to the Visual Studio Marketplace (or your local Team Foundation Server)


