const path = require("path");
const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, "Trellotion-icon.png"),
    webPreferences: {
      contextIsolation: true,
    },
  });

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, "frontend/build/index.html")}`
    : "http://localhost:3000";

  mainWindow.loadURL(startUrl);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
