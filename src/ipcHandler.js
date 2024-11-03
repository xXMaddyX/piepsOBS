const { ipcMain, app } = require('electron');
import { rumbleAPIData, localStore } from './localStorage/connectionData';
import App from './obsconnect/App.js';
const connection = new App();

const IpcInit = () => {
    ipcMain.handle("getObsVersion", () => {
        return rumbleAPIData.numOfFollowers
      });

    ipcMain.handle("exitProgramm", () => {
      app.exit();
    });

    ipcMain.handle("set-obs-data", (e, data) => {
      localStore.obsConfig.adress = data.adress;
      localStore.obsConfig.password = data.password;
    });

    ipcMain.handle("connect-to-obs", async () => {
      await connection.initObsConnect();
      await connection.obsInfo.getVersion();
      await connection.initRumbleConnect();
    });

    ipcMain.handle("connect-to-rumble", () => {
      connection.rubleConnection();
    })
};

export default IpcInit;