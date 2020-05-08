const util = require('util');
const subprocess = require('child_process');
const fileSystem = require('fs-extra');
const shell = util.promisify(subprocess.exec);

(async () => {

	fileSystem.copySync('./public', './deploy');

	console.log((await shell(`node tools/googleapp_builder.js`)).stdout);
	console.log((await shell(`rm -r deploy/**/*.js`)).stdout);
	console.log((await shell(`rm -r deploy/**/*.js.map`)).stdout);
	console.log((await shell(`rm -r deploy/**/*.css`)).stdout);
	console.log((await shell(`rm -r deploy/index.html`)).stdout);

	fileSystem.copySync('./sources', './deploy');

})().catch(err => console.error(err));

