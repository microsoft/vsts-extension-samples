/// <reference path="../../../typings/tsd.d.ts" />
/// <reference path="../../../typings/vsts-task-lib/vsts-task-lib.d.ts" />

import * as placeholder from "../../../src/tasks/placeholder/placeholder";

import chai = require("chai");
import sinon = require("sinon");
import sinonChai = require("sinon-chai");
import tl = require("vsts-task-lib/task");

chai.should();
chai.use(sinonChai);

describe("placeholder.placeholder", (): void => {
    var sandbox;
    var getInputStub;

    beforeEach((): void => {
        sandbox = sinon.sandbox.create();
        getInputStub = sandbox.stub(tl, "getInput");
    });

    afterEach((): void => {
        sandbox.restore();
    });

    it("should pass", (): void => {
        placeholder.placeholder();

        getInputStub.withArgs("placeholder").should.have.been.calledOnce;
    });
});