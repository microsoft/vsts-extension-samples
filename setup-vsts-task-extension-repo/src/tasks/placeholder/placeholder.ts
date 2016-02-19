/// <reference path="../../../typings/vsts-task-lib/vsts-task-lib.d.ts" />

import tl = require("vsts-task-lib/task");

export function placeholder(): void {
    var placeholder = tl.getInput("placeholder", true);
}