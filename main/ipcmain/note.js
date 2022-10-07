const { ipcMain } = require('electron');
const foldersCollection = require('../database/db');

ipcMain.handle('getNote', (event, folderId) => {
  return foldersCollection
    .find({ _id: folderId })
    .then((folder) => {
      return folder.note;
    })
    .catch((err) => {});
});

ipcMain.handle('updateNote', (event, folderId, note) => {
  return foldersCollection.update({ _id: folderId }, { $set: { note } });
});
