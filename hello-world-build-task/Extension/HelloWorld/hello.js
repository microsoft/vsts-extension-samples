var tl = require('vso-task-lib');

var name = tl.getInput('name', true);

tl.debug("args:");
tl.debug("name:"+name);

console.log("Hello "+name);

tl.exit(0);
