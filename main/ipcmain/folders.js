const { ipcMain, dialog } = require('electron');
const path = require('path');
const foldersCollection = require('../database/db');

ipcMain.handle('getFolders', () => {
  return foldersCollection.find();
});
ipcMain.handle('getFolder', (event, id) => {
  return foldersCollection.findOne({ _id: id }).then((d) => {
    return d;
  });
});

ipcMain.handle('addFolder', () => {
  return dialog
    .showOpenDialog({
      message: 'select project folder',
      properties: ['openDirectory', 'dontAddToRecent'],
    })
    .then((selection) => {
      if (selection.canceled === false && selection.filePaths[0])
        return foldersCollection.insert({
          heading: path.basename(selection.filePaths[0]),
          folderPath: selection.filePaths[0],
        });

      throw new Error('no selection');
    })
    .catch((err) => {
      throw err;
    });
});

ipcMain.handle('remouveFolder', (event, folderId) => {
  foldersCollection.remove({ _id: folderId });
});
