const { ipcMain, app } = require('electron');
import { rumbleAPIData } from './localStorage/connectionData';

const IpcInit = () => {
    ipcMain.handle("getObsVersion", () => {
        return rumbleAPIData.numOfFollowers
      });

    ipcMain.handle("exitProgramm", () => {
      app.exit();
    });
}

export default IpcInit;