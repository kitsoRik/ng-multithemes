const { readdirSync, writeFileSync, readFileSync } = require("fs");
const { join, relative, basename } = require("path");

const args = require("yargs").argv;

const inputPath = args["input"];

if (!inputPath) {
	throw new Error("Input path does not exists");
}

let preffixPath = args["preffix"];

if (!preffixPath) {
	console.warn("Preffix not found, using default preffix 'assets/themes/'");
	preffixPath = "assets/themes/";
}

const angularJsonPath = args["angularjson"]
	? args["angularjson"]
	: join(__dirname, "../../../angular.json");

generate(inputPath, preffixPath);

function generate(inputPath, preffixPath) {
	const angularJsonData = readFileSync(angularJsonPath);

	const angularJsonObject = JSON.parse(angularJsonData);

	const projectName = Object.keys(angularJsonObject.projects)[0];
	const optionsInAngular =
		angularJsonObject.projects[projectName].architect.build.options;

	const paths = getThemesPaths(inputPath);

	optionsInAngular.styles = [
		...optionsInAngular.styles.filter((style) => {
			if (typeof style !== "object") return true;

			for (let i = 0; i < paths.length; i++) {
				const path = paths[i];
				if (
					relative(
						join(angularJsonPath, style.input),
						join(angularJsonPath, path)
					) === ""
				) {
					return false;
				}
			}
			return true;
		}),
		...getStyleObjects(paths, preffixPath),
	];

	writeFileSync(angularJsonPath, JSON.stringify(angularJsonObject));
}

function getThemesPaths(inputPath) {
	const dir = readdirSync(inputPath, { withFileTypes: true });

	let paths = [];

	dir.forEach((item) => {
		if (item.isDirectory()) return;

		if (/.*\.scss/.test(item.name)) {
			paths.push(join(inputPath, item.name));
		}
	});

	return paths;
}

function getStyleObjects(paths, preffixPath) {
	return paths.map((path) => {
		const fileName = /(.*).scss/.exec(basename(path))[1];
		return {
			lazy: true,
			inject: false,
			input: path,
			bundleName: `${preffixPath}${fileName}`,
		};
	});
}
