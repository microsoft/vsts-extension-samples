import * as React from "react";
import * as ReactDOM from "react-dom";

import { MainComponent } from "./main";
import { IWorkItemInfo } from "./interfaces";

let element = document.getElementById("main");
let mainComponent: MainComponent; 

ReactDOM.render(<MainComponent ref={(i) => mainComponent = i} />, element);

var panel = {
    workItemSelectionChanged: (workItemInfos: IWorkItemInfo[]) => { 
        mainComponent.setWorkItemIds(workItemInfos.map(wi => wi.workItemId));
    }
};

VSS.register("detailsPanelObject", panel);