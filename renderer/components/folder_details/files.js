const filesSectionElement = document.getElementById("filesSection");
const filesListElement = document.getElementById("files");

export const showFiles = (folder) => {
  filesListElement.innerHTML = "";
  if (folder.files && folder.files.length > 0) {
    filesSectionElement.classList.remove("hide");
    folder.files.forEach((file) => {
      filesListElement.appendChild(createFileElement(file, folder._id));
    });
  } else {
    filesSectionElement.classList.add("hide");
  }
};

export const addFileToFolder = (files, folderId) => {
  if (files && files.length > 0) {
    filesSectionElement.classList.remove("hide");
    for (let i = 0; i < files.length; i++) {
      filesListElement.appendChild(createFileElement(files[i], folderId));
    }
  }
};

function createFileElement(file, folderId) {
  const el = document.createElement("figure");
  el.className = "file";
  el.innerHTML = `
    
    <img
        class="file-thumb"
        src="projectsdock://${file}"
        alt={file}
    />
    <figcaption class="file--heading">${file}</figcaption>
 `;

  const remouveBtn = document.createElement("button");
  remouveBtn.className = "file--remouve";
  remouveBtn.innerHTML = ` <i class="fa-solid fa-xmark" />`;
  remouveBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    el.remove();
    window.api.remouveFile(folderId, file).then((el) => {});
  });

  el.appendChild(remouveBtn);

  el.addEventListener(
    "click",
    (e) => {
      openFile(file);
    },
    { capture: false }
  );
  return el;
}

const openFile = (file) => {
  window.api.openLink(file);
};
