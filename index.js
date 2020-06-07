#!/usr/bin/env node
const args = require("yargs").argv;

if (args._.indexOf("generate") !== -1) {
	if (args._.indexOf("theme") !== -1) {
		require("./src/generate-theme");
	}

	if (args._.indexOf("bundle") !== -1) {
		require("./src/generate-angularjson");
	}
} else {
	throw new Error(
		"'generate' option hasn't been found, please use this command with 'generate' options"
	);
}
