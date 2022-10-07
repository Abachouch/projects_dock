const { app, Menu, Tray } = require("electron");
const calculateWindowPosition = require("./tray_position");

module.exports = function (window, iconPath) {
  const tray = new Tray(iconPath);

  tray.on("click", () => {
    const pos = calculateWindowPosition(
      tray,
      window.getBounds().width,
      window.getBounds().height
    );
    window.setPosition(pos.x, pos.y);
    if (window.isVisible()) window.hide();
    else window.show();
  });

  const contextMenu = Menu.buildFromTemplate([
    {
      label: "open in startup",
      type: "checkbox",
      checked: app.getLoginItemSettings().openAtLogin,
      click: (item) => {
        if (item.checked) {
          app.setLoginItemSettings({ openAtLogin: true });
        } else {
          app.setLoginItemSettings({ openAtLogin: false });
        }
      },
    },
    {
      label: "quite application",
      type: "normal",
      click: () => {
        app.quit();
      },
    },
  ]);
  tray.setContextMenu(contextMenu);

  return tray;
};
