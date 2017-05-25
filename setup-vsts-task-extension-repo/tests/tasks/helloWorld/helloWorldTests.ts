/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../typings/vsts-task-lib/vsts-task-lib.d.ts" />

import * as helloWorld from "../../../src/tasks/helloWorld/helloWorld";

import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import tl = require("vsts-task-lib/task");

chai.should();
chai.use(sinonChai);

describe("helloWorld.sayHello", (): void => {
    var sandbox;
    var getInputStub;

    beforeEach((): void => {
        sandbox = sinon.sandbox.create();
        getInputStub = sandbox.stub(tl, "getInput");
    });

    afterEach((): void => {
        sandbox.restore();
    });

    it("should correctly greet the correct person", (): void => {
        var consoleLogStub = sandbox.stub(console, "log");

        getInputStub.withArgs("greeting").returns("Happy Diwali");
        getInputStub.withArgs("greeted").returns("folks");

        helloWorld.sayHello();

        consoleLogStub.withArgs("Happy Diwali folks!").should.have.been.calledOnce;

        consoleLogStub.restore();
    });
});