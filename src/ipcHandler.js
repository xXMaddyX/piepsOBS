const { ipcMain } = require('electron');
import { rumbleAPIData } from './localStorage/connectionData';

const IpcInit = () => {
    ipcMain.handle("getObsVersion", () => {
        return rumbleAPIData.numOfFollowers
      });
}

export default IpcInit;