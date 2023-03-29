const { app, BrowserWindow } = require("electron");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // devTools: false
    },
    width: 800,
    height: 600,
  });

  mainWindow.loadFile("index.html");

  // mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
