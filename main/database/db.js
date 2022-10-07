const { app } = require('electron');
const path = require('path');
const Datastore = require('nedb-promises');

const JsonFilePath = path.join(
  app.getPath('appData'),
  'tray dock',
  'folderPaths.nedb'
);
const foldersCollection = Datastore.create(JsonFilePath);

module.exports = foldersCollection;
