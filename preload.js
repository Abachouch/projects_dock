const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  addFolder: () => ipcRenderer.invoke("addFolder"),
  remouveFolder: (folderId) => ipcRenderer.invoke("remouveFolder", folderId),
  getFolders: () => ipcRenderer.invoke("getFolders"),
  getFolder: (id) => ipcRenderer.invoke("getFolder", id),
  openWith: (app, folderPath) =>
    ipcRenderer.invoke("openWith", app, folderPath),
  assetsFileExist: (folderPath) =>
    ipcRenderer.invoke("assetsFileExist", folderPath),
  getAssets: (folderPath) => ipcRenderer.invoke("getAssets", folderPath),
  addFile: (folderId) => ipcRenderer.invoke("addFile", folderId),
  remouveFile: (folderId, filePath) =>
    ipcRenderer.invoke("remouveFile", folderId, filePath),
  getScripts: (folderPath) => ipcRenderer.invoke("getScripts", folderPath),
  runScript: (folderPath, command) =>
    ipcRenderer.send("runScript", folderPath, command),
  oppenAssetsFile: (folderPath) =>
    ipcRenderer.invoke("openAssetsFile", folderPath),
  getNote: (folderId) => ipcRenderer.invoke("getNote", folderId),
  updateNote: (folderId, text) =>
    ipcRenderer.invoke("updateNote", folderId, text),
  openLink: (link) => ipcRenderer.invoke("openLink", link),
});
