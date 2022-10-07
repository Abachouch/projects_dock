const { exec } = require("child_process");
const { ipcMain } = require("electron");
const { readFile } = require("fs/promises");
const path = require("path");

ipcMain.handle("getScripts", (event, folderPath) => {
  return readFile(path.join(folderPath, "package.json"), {
    encoding: "utf-8",
  })
    .then((data) => {
      const scripts = [];
      const parsedData = JSON.parse(data.toString());
      const scriptsObject = parsedData.scripts;
      for (let i = 0; i < Object.entries(scriptsObject).length; i += 1) {
        scripts.push({
          heading: Object.keys(scriptsObject)[i],
          command: Object.values(scriptsObject)[i],
        });
      }
      return scripts;
    })
    .catch((error) => {
      return [];
    });
});

ipcMain.on("runScript", (event, folderPath, script) => {
  const packageManager = "npm";
  const pms = packageManager === "npm" ? "--prefix" : "--cwd";
  const comd = `start ${packageManager} ${pms} ${folderPath} run ${script} `;
  exec(comd);
  event.returnValue = "";
});
