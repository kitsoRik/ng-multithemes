# Welcome to ng-multithemes

ng-multithemes allow create an angular application with any themes, it's can be do with generator which in-built in package.

# How to install

Use `npm install ng-multithemes --save-dev` to install as dev dependies.

## How to use

Create folder or file with name of your theme (example: `/dark/colors.scss` or `dark.scss`), and run generate command with any parent path: `npx ng-multithemes generate theme --input=\"./src/app\" --output=\"src/themes/\" --theme="dark"`

After generate all themes, you can add it's to your angular.json, or you can use npx `ng-multithemes generate angularjson --input="src/themes"`, and your angular.json will transform to as it should be.

## Commands (generate theme)

| command | description                                                                          |
| ------- | ------------------------------------------------------------------------------------ |
| input   | parent path of input in your application (src/app is better)                         |
| output  | path (folder of file) to output themes (src/themes is better)                        |
| theme   | name of your theme (preffix for find folders or files and output file with this name |

## Commands (generate angularjson)

| command | description                   | default        |
| ------- | ----------------------------- | -------------- |
| input   | path to folders of you themes | -              |
| preffix | preffix to bundle name        | assets/themes/ |

## How to change theme in code

To change theme you can use package [`ng-multithemes-theme-manager`](https://github.com/kitsoRik/ng-multithemes-theme-manager-project)
