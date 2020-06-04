const args = require("yargs").argv;

if (args._.indexOf("generate") !== -1) {
	if (args._.indexOf("theme") !== -1) {
		require("./src/generate-theme");
	}

	if (args._.indexOf("bundle") !== -1) {
		require("./src/generate-angularjson");
	}
}
