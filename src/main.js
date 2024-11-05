const { app, BrowserWindow, ipcMain} = require('electron');
import { localStore } from './localStorage/connectionData.js';
const path = require('node:path');
import fs from 'fs/promises';
//import App from './obsconnect/App.js';
import IpcInit from './ipcHandler.js';

// TO DO; SAVE DATA TO LOCAL FILE
const loadDataAtStartup = async () => {
  try {
    const savePath = path.join(app.getPath('userData'), 'piepsobscon.json');
    const data = await fs.readFile(savePath, 'utf-8');
    const loadetData = JSON.parse(data);
    localStore.obsConfig = loadetData.obsConfig;
    localStore.rumbleConfig = loadetData.rumbleConfig;
  } catch (err) {
    console.error(new Error("No Settings Saved"));
  };
};

loadDataAtStartup();

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: false,
    
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  };

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
  let mainWindow = createWindow();
  IpcInit(mainWindow);

  //This needs to be loadet after user has entered informations
  //await obsApp.initApp();
  //await obsApp.obsInfo.getVersion();
  //await obsApp.rubleConnection.fetchAPIonStart();
  //obsApp.rubleConnection.update();
  

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    };
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  };
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
