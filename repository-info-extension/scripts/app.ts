/// <reference path='../node_modules/vss-web-extension-sdk/typings/tfs.d.ts' />

import TFS_VC_Services = require("TFS/VersionControl/Services");

export async function execute() {
    const svc = await TFS_VC_Services.VersionControlRepositoryService.getService();
    const repo = await svc.getCurrentGitRepository();
    let idContainer = document.getElementById("repository-id");
    let nameContainer = document.getElementById("repository-name");
    let urlContainer = document.getElementById("repository-url");
    idContainer.innerHTML = repo.id;
    nameContainer.innerHTML = repo.name;
    urlContainer.innerHTML = repo.url;
}