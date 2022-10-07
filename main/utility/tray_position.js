const { screen, Tray } = require("electron");

module.exports = function (tray, width, height) {
  // console.log(tray);
  const { workArea, bounds } = screen.getDisplayMatching(tray.getBounds());

  let x;
  let y;
  workArea.x -= bounds.x;
  workArea.y -= bounds.y;

  // TASKBAR LEFT
  if (workArea.x > 0) {
    x = Math.floor(workArea.x);
    y = Math.floor(workArea.height - height);
    return { x, y };
  }

  // TASKBAR TOP
  if (workArea.y > 0) {
    x = Math.floor(workArea.width - width - 20);
    y = Math.floor(workArea.y);
    return { x, y };
  }
  // TASKBAR RIGHT
  if (workArea.width < bounds.width) {
    x = Math.floor(workArea.width - width);
    y = Math.floor(workArea.height - height);
    return { x, y };
  }
  // TASKBAR BOTTOM
  x = Math.floor(workArea.width - width - 20);
  y = Math.floor(workArea.height - height);
  return { x, y };
};
