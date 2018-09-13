/// <reference path='../node_modules/vss-web-extension-sdk/typings/tfs.d.ts' />

import TFS_VC_Services = require("TFS/VersionControl/Services");

export async function execute(containerId: string) {
    const svc = await TFS_VC_Services.VersionControlRepositoryService.getService();
    const repo = await svc.getCurrentGitRepository();
    let container = document.getElementById(containerId);
    container.innerHTML = JSON.stringify(repo);
}