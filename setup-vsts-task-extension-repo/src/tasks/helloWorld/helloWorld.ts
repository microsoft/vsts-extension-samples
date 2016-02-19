/// <reference path="../../../typings/vsts-task-lib/vsts-task-lib.d.ts" />

import tl = require("vsts-task-lib/task");

export function sayHello(): void {
    var greeting = tl.getInput("greeting", true);
    var greeted = tl.getInput("greeted", true);

    console.log(greeting + " " + greeted + "!");
}