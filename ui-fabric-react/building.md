# Building and packaging this sample extension

To learn more about this extension, see [README.md](./README.MD)

## Prerequisites

If you plan to build and install this extension, you need:

* [Node.js](https://nodejs.org) (install with npm)

## Try it

### Get dependencies

After cloning this sample extension, run:

* ```npm install``` (to pull down required dependencies)

### Packaging and publishing

To run the extension, you need to publish it. This requires having a publisher on the Visual Studio Marketplace that you can publish under.

1. [Get a publisher ID](https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/overview)
2. Update the `publisher` property in `manifests/base.json` with your publisher ID. For example:    
   ``` 
      "publisher": "my-publisher-id" 
   ```
    
### Packaging

You can run this sample in two modes: 

* `bundled` scripts are bundled together and packaged with the extension
* `local`: scripts are not bundled and served from a local web server)

Bundled is the easiest since it doesn't require a local web server. Local is faster to develop and debug since content is served from your machine and updates can be made without updating the extension package.

In both modes, the `--rev-version` package option is applied. This causes the third segment of the extension's version to be incremented on each package (and for the manifest file to be updated). See [TFX CLI extension commands](https://github.com/Microsoft/tfs-cli/blob/master/docs/extensions.md) for more information.

#### Bundled

To create a self-contained extension package (.vsix file) containing all the scripts and files needed by the extension run:

```
node_modules/.bin/gulp
``` 

This will create a extension package (.vsix file) in the `dist` folder.

#### Local web server

During development it can be faster to run your own web server on your local machine. To go this route:

1. Update the `baseUri` property in `manifests/local.json` to point to your local web server. For example: `http://mymachine:8080/ui-officefabric`.
2. Run `node_modules/.bin/gulp --local`

This will create a extension package (.vsix file) in the `dist` folder.

In local model, updates to HTML or CSS files do not require re-packaging or re-publishing the extension since content is served locally. Changes to TypeScript files requires compilation:

```
node_modules/.bin/tsc
```

To have TypeScript file changes get built automatically, run: 

```
node_modules/.bin/tsc -w
``` 

### Publishing

To publish the packaged extension file (.vsix) to the Marketplace from the command line, run:

```
node_modules/.bin/tfx extension publish --vsix dist/my-publisher-id.samples-ui-fabric-react-1.0.0.vsix
```

Or upload via the web-based management portal. See [Publish the extension](https://www.visualstudio.com/en-us/docs/integrate/extensions/publish/overview) to the Visual Studio Marketplace (or your local Team Foundation Server)