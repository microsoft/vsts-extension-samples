**placeholder**

# sample-vsts-taskExtension
This is a sample repo to develop VSTS Build Task as an extension for Visual Studio Team Services.
This repo has build, test and packaging systems in place.
You can use this to quickly setup a repo for your task.

This [commit](http://aka.ms/sample-vsts-task-extension-repo-placeholder) has the place holders that need to be filled by the task developer. Replace the string 'placeholder' in file names and contents appropriately. You will have a fully set repo.
See what needs to be done to setup a repo for HelloWorld task
1. [rename](http://aka.ms/sample-vsts-task-extension-repo-rename)
2. [replace](http://aka.ms/sample-vsts-task-extension-repo-fill)

## Working with this repo

### Implementation details
* Task and corresponding tests are in TypeScript.
* Lint is the static analysis tool.
* Istanbul is the code coverage tool.
* Mocha is the testing framework.
* Chai, Sinon and Sinon-Chai are used for assertions.

### Commands
(assuming node is installed)

Once:
```bash
$ npm install
$ npm install gulp -g
$ npm install tfx-cli -g
```

Build:
```bash
$ gulp build
```

Test:
```bash
$ gulp test
```

Package (vsix will be generated at _build/package):
```bash
$ gulp package
```