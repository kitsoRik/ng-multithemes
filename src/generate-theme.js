const { readdirSync, writeFileSync, lstatSync } = require("fs");
const { join, relative } = require("path");

const args = require("yargs").argv;

const inputPath = args["input"];

if (!inputPath) {
	throw new Error("Input path does not exists");
}

const outputPath = args["output"];

if (!outputPath) {
	throw new Error("Output path does not exists");
}

const themeName = args["theme"];

if (!themeName) {
	throw new Error("Theme path does not exists");
}

generate(inputPath, outputPath, themeName);

function generate(inputPath, outputPath, themeName) {
	const result = findFileAndFolderByThemeName(
		inputPath,
		themeName,
		outputPath
	);
	const out = lstatSync(outputPath).isDirectory()
		? join(outputPath, themeName + ".scss")
		: outputPath;
	writeFileSync(out, result);
}

function findFileAndFolderByThemeName(path, themeName, outputPath) {
	const paths = findFileAndFolderByThemeNameRecursive(path, themeName);

	return paths
		.map((path) => {
			const relativePath = relative(outputPath, path);

			if (relativePath === "" || relativePath === themeName + ".scss")
				return "";

			return `@import "${relativePath.replace(/\\/g, "/")}";`;
		})
		.reduce((p, c) => `${p}\n${c}`, "");
}

function findFileAndFolderByThemeNameRecursive(path, themeName) {
	const dirs = readdirSync(path, { withFileTypes: true });
	let paths = [];
	dirs.forEach((dir) => {
		const itemPath = join(path, dir.name);
		if (dir.isDirectory()) {
			if (dir.name === themeName) {
				paths = [
					...paths,
					...findFilesInFolderThemeNameRecursive(
						join(path, dir.name)
					),
				];
			} else {
				paths = [
					...paths,
					...findFileAndFolderByThemeNameRecursive(
						itemPath,
						themeName
					),
				];
			}
		} else {
			if (dir.name === themeName + ".scss") {
				paths.push(itemPath);
			}
		}
	});

	return paths;
}

function findFilesInFolderThemeNameRecursive(path) {
	const dirs = readdirSync(path, { withFileTypes: true });
	let paths = [];
	dirs.forEach((dir) => {
		const itemPath = join(path, dir.name);
		if (dir.isDirectory()) {
			paths = [
				...paths,
				...findFilesInFolderThemeNameRecursive(itemPath),
			];
		} else {
			paths.push(itemPath);
		}
	});

	return paths;
}
