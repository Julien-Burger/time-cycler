import { contextBridge, ipcRenderer } from "electron/renderer";

contextBridge.exposeInMainWorld("app", {
    pinboard: () => ipcRenderer.send("pinboard"),
    lockWindow: () => ipcRenderer.send("lock-window"),
});
