const noteInpuElement = document.getElementById("noteInput");
const saveBtn = document.getElementById("saveNote");
let folderId = "";
let currentText = "";
export const setNoteValue = (text) => {
  noteInpuElement.value = text;
  currentText = text;
  extractColors();
  extractLinks();
};

noteInpuElement.addEventListener("keyup", () => {
  if (currentText === noteInpuElement.value) {
    saveBtn.disabled = true;
  } else {
    saveBtn.disabled = false;
  }
  extractColors();
  extractLinks();
});

function valueChaged() {}

const extractColors = () => {
  const t = noteInpuElement.value;

  const clrs = t.match(
    /(?:#|0x)(?:[a-f0-9]{3}|[a-f0-9]{6})\b|(?:rgb|hsl)a?\([^)]*\)/gi
  );

  setColors(clrs || []);
};

const extractLinks = () => {
  const t = noteInpuElement.value;
  const lnks = t.match(
    /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/gi
  );
  const resolvedLinks = lnks?.map((lnk) => {
    return lnk.includes("http") ? lnk : "https://".concat(lnk);
  });
  setLinks(resolvedLinks || []);
};

const colorsListElement = document.getElementById("colors");
function setColors(colors) {
  colorsListElement.innerHTML = "";
  if (colors.length > 0) {
    colors.forEach((color) => {
      colorsListElement.appendChild(createColorElement(color));
    });
  }
}

const linksListElement = document.getElementById("links");
function setLinks(links) {
  linksListElement.innerHTML = "";
  if (links.length > 0) {
    links.forEach((link) => {
      linksListElement.appendChild(createLinkElement(link));
    });
  }
}

function createColorElement(color) {
  const el = document.createElement("div");
  el.className = "color";
  el.style.backgroundColor = color;
  el.addEventListener("click", () => {
    navigator.clipboard.writeText(color);
  });
  return el;
}

function createLinkElement(link) {
  const url = new URL(link);
  const el = document.createElement("div");
  el.className = "link";
  el.innerHTML = link;
  el.innerHTML = `
    <img
    src="http://www.google.com/s2/favicons?sz=64&domain=${link}"}
    alt=${link}
    class="link-favicon"
  />
  <h4 class="link-domain">${url.hostname}</h4>
  <span class="link-full">${link} </span>
  `;
  el.addEventListener("click", () => {
    window.api.openLink(link);
  });
  return el;
}

saveBtn.addEventListener("click", () => {
  const details = document.getElementById("details");
  window.api.updateNote(details.dataset.folderId, noteInpuElement.value);
});
