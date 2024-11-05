const { ipcMain, app } = require('electron');
import fs from 'fs/promises';
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
    //-------------------------------------------------------------------------------------
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