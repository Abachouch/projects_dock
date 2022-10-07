const { ipcMain, dialog } = require('electron');
const foldersCollection = require('../database/db');

ipcMain.handle('addFile', (event, folderId) => {
  return dialog
    .showOpenDialog({
      message: 'select project folder',
      properties: ['openFile', 'multiSelections', 'dontAddToRecent'],
      filters: [
        {
          name: 'images',
          extensions: [
            'png',
            'jpeg',
            'jpg',
            'jfif',
            'pjpeg',
            'pjp',
            'gif',
            'webp',
            'svg',
            'ico',
            'bmp',
            'apmg',
          ],
        },
      ],
    })
    .then((selection) => {
      if (selection.canceled === false && selection.filePaths) {
        foldersCollection.update(
          { _id: folderId },
          { $push: { files: { $each: selection.filePaths } } }
        );
        return selection;
      }

      throw new Error('no selection');
    })
    .then((selection) => {
      return selection.filePaths;
    })
    .catch((err) => {
      throw err;
    });
});

ipcMain.handle('remouveFile', (event, folderId, file) => {
  return foldersCollection.update(
    { _id: folderId },
    { $pull: { files: file } }
  );
});
