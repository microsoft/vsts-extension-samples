## sample backlog panel ##

Sample backlog panel extension using Typescript and React. 

### Structure ###

```
/scripts            - Typescript code for extension
/img                - Image assets for extension and description
/typings            - Typescript typings

details.md          - Description to be shown in marketplace   
index.html          - Main entry point
vss-extension.json  - Extension manifest
```

### Usage ###

1. Clone the repository
1. `npm install` to install required dependencies
2. `grunt` to build and package the application

#### Grunt ####

Two basic `grunt` tasks are defined:

* `build` - Compiles TS files in `scripts` folder
* `package` - Builds the vsix package

#### Including framework modules ####

The VSTS framework is setup to initalize the requirejs AMD loader, so just use `import Foo = require("foo")` to include framework modules.