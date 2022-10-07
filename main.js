const path = require("path");
const { app, BrowserWindow, protocol } = require("electron");
const trayBuilderder = require("./main/utility/tray");

const width = 400;
const height = 600;
function createWindow() {
  const win = new BrowserWindow({
    width,
    height,
    frame: false,
    resizable: false,
    transparent: false,
    paintWhenInitiallyHidden: true,
    show: false,
    movable: false,
    minimizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
    },
  });
  win.loadFile(path.join(__dirname, "renderer", "index.html"));

  const tray = trayBuilderder(win, path.join(__dirname, "assets", "icon.png"));
}

app.whenReady().then(() => {
  protocol.registerFileProtocol("projectsdock", (request, callback) => {
    const url = request.url.substr(15);
    callback(decodeURI(path.normalize(url)));
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

require("./main/ipcmain/ipcmain");
