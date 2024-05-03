import { app, shell, BrowserWindow, ipcMain } from "electron";
import { join } from "path";

const isDev = import.meta.env.DEV;
let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 280,
        height: 370,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
            sandbox: false,
        },
        resizable: false,
    });

    mainWindow.on("ready-to-show", () => {
        mainWindow.show();
    });

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url);
        return { action: "deny" };
    });

    if (isDev && process.env["ELECTRON_RENDERER_URL"]) {
        mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
    }
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.on("pinboard", () => {
        mainWindow.setAlwaysOnTop(!mainWindow.isAlwaysOnTop());
    });

    ipcMain.on("lock-window", () => {
        mainWindow.setMovable(!mainWindow.isMovable());
    });

    app.on("activate", function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
