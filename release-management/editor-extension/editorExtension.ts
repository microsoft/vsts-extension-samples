/// <reference path="node_modules/vss-web-extension-sdk/typings/VSS.SDK.d.ts" />
import ko = require("knockout");
class ITaskEditorExtensionDelegates {
    fileContentProviderDelegate?: (filePath: string, callback: (content: any) => void, errorCallback: (error: any) => void) => void;
}

class configuration {
    target: string; // Name of the input which invoked the extension.
    inputValues: { [key: string]: string; }; // values of all the input fields in the task 
    extensionDelegates: ITaskEditorExtensionDelegates;
}

class gridViewModel
{
    public parameters = ko.observableArray([]);
    public initialize(initialValue: string) {
        var value: any = []
        if (initialValue != undefined && initialValue != "") {
            try {
                value = JSON.parse(initialValue)
            }
            catch {
            }
        }
        this.parameters(value);
    }
    public add(){
        this.parameters.push({name:"", value:""});
    }

    public remove(variable , evt) {
        var context = ko.contextFor(evt.target).$parent;
        context.parameters.remove(this);
    }

    public onOkClicked(){
        return JSON.stringify(this.parameters());
    }
}

var vm = new gridViewModel();
ko.applyBindings(vm);
var config: configuration = VSS.getConfiguration(); 
vm.initialize(config.inputValues[config.target]);

VSS.register("openalm2.task-editor-extension.my-task-editor-extension", vm);
VSS.notifyLoadSucceeded();


