import * as React from "react";
import { WorkItem } from "TFS/WorkItemTracking/Contracts";
import { IModel } from "./model";

export interface IWorkItemInfo {
   workItemId: number;
   workItemType: string;
}

export interface IDetailsWidgetProps extends React.Props<void> {
    backlogDetailsModel: IModel;
}