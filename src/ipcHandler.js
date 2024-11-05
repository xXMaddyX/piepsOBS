const { ipcMain, app } = require('electron');
import fs from 'fs/promises';
import path from 'path';
import { rumbleAPIData, localStore } from './localStorage/connectionData';
import App from './obsconnect/App.js';

const connection = new App();

const SceneStates = {
  allertState: false,
}

const IpcInit = () => {
    //----------------------------->>>>BASIC_HANDLERS<<<<----------------------------------
    //EXIT_PROGRAMM_HANDLER
    ipcMain.handle("exitProgramm", () => {
      app.exit();
    });
    //SAVE_SETTINGS_TO_LOCAL_FILE
    ipcMain.handle("save-data-to-file", () => {

    });
    //-------------------------------------------------------------------------------------
    //------------------------------>>>>OBS_HANDLERS<<<<-----------------------------------
    ipcMain.handle("getObsVersion", () => {
      return rumbleAPIData.numOfFollowers;
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
    //-------------------------------------------------------------------------------------
    //----------------------------->>>>RUMBLE_HANDLERS<<<<---------------------------------
    ipcMain.handle("connect-to-rumble", () => {
      connection.rubleConnection();
    });
    ipcMain.handle("set-rumble-data", (e, data) => {
      localStore.rumbleConfig.url = data;
    });
    //-------------------------------------------------------------------------------------
    //--------------------------->>>>SAVE_SETTINGS_HANDLER<<<<-----------------------------
    ipcMain.handle("save-settings-event", async () => {
      const dirPath = app.getPath('userData');
      console.log(localStore.rumbleConfig.url)
      const filePath = path.join(dirPath, 'piepsobscon.json');
      const dataToSave = {
        obsConfig: localStore.obsConfig,
        rumbleConfig: localStore.rumbleConfig
      };
      if (localStore.obsConfig.password === "" && localStore.rumbleConfig.url === "") {
        console.log("Data not set");
        return;
      } else {
        const jsonData = JSON.stringify(dataToSave);
        console.log("Data Saved");
        try {
          await fs.mkdir(dirPath, { recursive: true });
          await fs.writeFile(filePath, jsonData);
          return { success: true, message: "Settings saved successfully." };
        } catch (error) {
          return { success: false, message: "Error saving settings", error };
        };
      };
    });
    //------------------------->>>>TEST_HANDLER_REMOVE_LATER<<<<---------------------------
    //Test Handler Remove later!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ipcMain.handle("test-Alert", async () => {
      console.log("Called");
      SceneStates.allertState = !SceneStates.allertState;
      const { sceneItemId } = await connection.obsConnection.obs.call("GetSceneItemId", {
        sceneName: "TestScene",
        sourceName: "FollowerAlert"
      });
      connection.obsConnection.obs.call("SetSceneItemEnabled", {
        sceneName: "TestScene",
        sceneItemId: sceneItemId,
        sceneItemEnabled: SceneStates.allertState
      });
    });
};

export default IpcInit;