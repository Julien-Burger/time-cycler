import { app, shell, BrowserWindow } from "electron";
import { join } from "path";

const isDev = import.meta.env.DEV;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 320,
        height: 420,
        show: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
            sandbox: false,
        },
        resizable: false,
    });
    mainWindow.setAlwaysOnTop(true);
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
