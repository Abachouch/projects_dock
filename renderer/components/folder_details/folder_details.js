import { getFolders } from "../home/folders_list.js";
import { addFileToFolder, showFiles } from "./files.js";
import { setNoteValue } from "./note.js";
import { showScripts } from "./scripts.js";

const detailPageEl = document.getElementById("details");

let folder = null;

export const showFolderDetails = (f) => {
  window.api.getFolder(f._id).then((fldr) => {
    folder = fldr;
    detailPageEl.classList.add("show");
    // header
    const folderHeadingEl = document.getElementById("folderHeading");
    folderHeadingEl.textContent = folder.heading;

    const folderPathEl = document.getElementById("folderPath");
    folderPathEl.textContent = folder.folderPath;
    //
    showScripts(folder.folderPath);
    setNoteValue(folder.note);
    showFiles(folder);
  });
};

const returnBtn = document.getElementById("return");
returnBtn.addEventListener("click", () => {
  detailPageEl.classList.remove("show");
});

const explorerBtn = document.getElementById("explorer");
explorerBtn.addEventListener("click", () => {
  openWith("explorer");
});

const terminalBtn = document.getElementById("terminal");
terminalBtn.addEventListener("click", () => {
  openWith("terminal");
});

const vsCode = document.getElementById("vscode");
vsCode.addEventListener("click", () => {
  openWith("vscode");
});

function openWith(app) {
  if (folder) {
    window.api.openWith(app, folder.folderPath);
  }
}

const addFile = document.getElementById("addFile");
addFile.addEventListener("click", () => {
  window.api.addFile(folder._id).then((file) => {
    addFileToFolder(file, folder._id);
  });
});

const removeFolder = document.getElementById("remouveFolder");
removeFolder.addEventListener("click", () => {
  window.api.remouveFolder(folder._id).then(() => {
    getFolders();
    detailPageEl.classList.remove("show");
  });
});
