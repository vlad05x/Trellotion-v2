const { app, BrowserWindow } = require("electron");
const path = require("path");
const { spawn } = require("child_process");

let mainWindow;
let backendProcess;

function getBackendPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, "backend", "server.js");
  } else {
    return path.join(__dirname, "backend", "server.js");
  }
}

function startBackend() {
  const backendPath = getBackendPath();

  backendProcess = spawn("node", [backendPath], {
    cwd: path.dirname(backendPath),
    detached: true,
    stdio: app.isPackaged ? "ignore" : "inherit",
  });

  backendProcess.unref();

  backendProcess.on("error", (err) => {
    console.error("Ошибка запуска backend:", err);
  });

  backendProcess.on("exit", (code) => {
    console.error(`Backend завершился с кодом ${code}`);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    icon: path.join(__dirname, "Trellotion-logo.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const startUrl = app.isPackaged
    ? `file://${path.join(__dirname, "frontend/build/index.html")}`
    : "http://localhost:3000";

  mainWindow.loadURL(startUrl);

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
}

app.on("ready", () => {
  startBackend();
  createWindow();
});

app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill("SIGTERM");
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
