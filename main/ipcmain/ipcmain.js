const { ipcMain, shell } = require("electron");
const { exec } = require("child_process");
const { readFile } = require("fs/promises");
const path = require("path");

ipcMain.handle("openWith", (event, openWith, folderPath) => {
  switch (openWith) {
    case "terminal":
      exec(`start cmd /k "cd /d ${folderPath}"`);
      break;
    case "vscode":
      exec(`code ${folderPath}`);
      break;
    default:
      shell.openPath(folderPath);
      break;
  }
});

ipcMain.handle("openLink", (event, link) => {
  shell.openPath(link);
});

require("./folders");
require("./files");
require("./note");
require("./scripts");
