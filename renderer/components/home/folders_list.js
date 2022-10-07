import { showFolderDetails } from "../folder_details/folder_details.js";

const foldersListElement = document.getElementById("foldersList");
const addFolderButton = document.getElementById("addFolder");

export const getFolders = () => {
  foldersListElement.innerHTML = "";
  window.api.getFolders().then((folders) => {
    if (folders.length > 0) {
      folders.forEach((e) => {
        foldersListElement.appendChild(createFolderElement(e));
      });
    }
  });
};

addFolderButton.addEventListener("click", () => {
  window.api.addFolder().then((folder) => {
    if (folder) {
      foldersListElement.appendChild(createFolderElement(folder));
    }
  });
});

function createFolderElement(folder) {
  const el = document.createElement("div");
  el.className = "folder";

  el.innerHTML = `
      <span class="folder--icon">
        <i class="fa-solid fa-folder-open" ></i>
      </span>

        <div class="folder--info">
          <h3 class="folder--title">${folder.heading}</h3>
          <span class="folder--path">${folder.folderPath}</span>
        </div>

        <div class="folder--chevron">
          <i class="fa-solid fa-chevron-right" ></i>
        </div>
 
    `;
  el.addEventListener("click", () => {
    showFolderDetails(folder);
    const details = document.getElementById("details");
    details.dataset.folderId = folder._id;
  });
  return el;
}
