const scriptsSectionEl = document.getElementById("scriptsSection");
export const showScripts = (folderPath) => {
  window.api.getScripts(folderPath).then((scripts) => {
    const list = document.getElementById("scripts");
    list.innerHTML = "";
    if (scripts && scripts.length > 0) {
      scriptsSectionEl.classList.remove("hide");

      scripts.forEach((script) => {
        list.append(createScriptElement(script, folderPath));
      });
    } else {
      scriptsSectionEl.classList.add("hide");
    }
  });
};

function createScriptElement(script, folderPath) {
  const el = document.createElement("div");
  el.className = "script";
  el.innerHTML = `
    <span class="script-title"> ${script.heading} </span>
    <span class="script-command"> ${script.command} </span>
  `;
  const runBtn = document.createElement("button");
  runBtn.className = "script-run";
  runBtn.innerText = "Run";
  runBtn.addEventListener("click", () => {
    window.api.runScript(folderPath, script.command);
  });
  el.appendChild(runBtn);
  return el;
}
