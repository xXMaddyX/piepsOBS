const { ipcMain, app, BrowserWindow } = require('electron');
import fs from 'fs/promises';
import path from 'path';
import App from './obsconnect/App.js';
import { setAlertData, alertData } from './localStorage/alertDataStore.js';
import AlertData from './localStorage/alertDataStore.js';
import AlertHandler from './obsAlertHandler/AlertHandler.js';

const connection = new App();
/**@type {AlertHandler} */
let alertHandler = null;

const STATES = {
  obsConnectionEnabled: false,
  rumbleConnetctionEnabled: false,
};

const SceneStates = {
  allertState: false,
};

/**@param {BrowserWindow} mainWindow*/
const IpcInit = (mainWindow) => {
    const windowRef = mainWindow;
    
    //----------------------------->>>>BASIC_HANDLERS<<<<----------------------------------
    //EXIT_PROGRAMM_HANDLER
    ipcMain.handle("exitProgramm", () => {
      app.exit();
    });
    //SAVE_SETTINGS_TO_LOCAL_FILE
    ipcMain.handle("save-data-to-file", () => {
      //PLANT TO SAVE SETTINGS CONFIG
    });
    //-------------------------------------------------------------------------------------
    //------------------------------>>>>OBS_HANDLERS<<<<-----------------------------------
    ipcMain.handle("set-obs-data", (e, data) => {
      localStore.obsConfig.adress = data.adress;
      localStore.obsConfig.password = data.password;
    });
    
    ipcMain.handle("connect-to-obs", async () => {
      if (!STATES.obsConnectionEnabled) {
        await connection.initObsConnect();
        await connection.obsInfo.getVersion();
        await connection.initRumbleConnect();

        //SEND_OBS_SCENE_DATA_TO_FRONTEND------------------------>
        try {
          const connectionAPIData = await connection.obsConnection.getSceneData();
          windowRef.webContents.send("obs-api-data", connectionAPIData);
        } catch (err) {
          console.log(new Error("Data Not get", err));
        };
        STATES.obsConnectionEnabled = true;
      } else {
        console.log("OBS Still Connected");
      };
    });
    //-------------------------------------------------------------------------------------
    //----------------------------->>>>RUMBLE_HANDLERS<<<<---------------------------------
    ipcMain.handle("connect-to-rumble", () => {
      if (!STATES.rumbleConnetctionEnabled) {
        connection.rubleConnection();
        STATES.rumbleConnetctionEnabled = true;
      } else {
        console.log("Rumble Still Connected");
      };
    });

    ipcMain.handle("set-rumble-data", (e, data) => {
      localStore.rumbleConfig.url = data;
    });
    //-------------------------------------------------------------------------------------
    //--------------------------->>>>SAVE_SETTINGS_HANDLER<<<<-----------------------------
    ipcMain.handle("save-settings-event", async () => {
      const dirPath = app.getPath('userData');
      const filePath = path.join(dirPath, 'piepsobscon.json');
      const dataToSave = {
        obsConfig: localStore.obsConfig,
        rumbleConfig: localStore.rumbleConfig
      };
      if (localStore.obsConfig.password === "" && localStore.rumbleConfig.url === "") {
        return;
      } else {
        const jsonData = JSON.stringify(dataToSave);
        try {
          await fs.mkdir(dirPath, { recursive: true });
          await fs.writeFile(filePath, jsonData);
          return { success: true, message: "Settings saved successfully." };
        } catch (error) {
          return { success: false, message: "Error saving settings", error };
        };
      };
    });

    //----------------------------->>>>ALERT_DATA_HANDLER<<<<------------------------------
    ipcMain.handle("send-alert-data-to-backend", (e, data) => {
      console.log(data)
      AlertData.setData(data);
      if (alertHandler === null) {
        alertHandler = new AlertHandler(connection.obsConnection.obs, connection.rubleConnection);
        alertHandler.init();
        alertHandler.setAlert();
        alertHandler.setRent();
        alertHandler.setSubscribtion();
        alertHandler.setChat();
        alertHandler.setFollowers();
      } else {
        alertHandler.setAlert();
        alertHandler.setRent();
        alertHandler.setSubscribtion();
        alertHandler.setChat();
        alertHandler.setFollowers();
      };
    });
    //-------------------------------------------------------------------------------------
    //------------------------->>>>TEST_HANDLER_REMOVE_LATER<<<<---------------------------
    //Test Handler Remove later!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ipcMain.handle("test-Alert", async () => {
      SceneStates.allertState = !SceneStates.allertState;
      let sceneItemId1 = await connection.obsConnection.obs.call("GetSceneItemId", {
        sceneName: "TestScene",
        sourceName: "FollowerAlert"
      });
      connection.obsConnection.obs.call("SetSceneItemEnabled", {
        sceneName: "TestScene",
        sceneItemId: sceneItemId1.sceneItemId,
        sceneItemEnabled: SceneStates.allertState
      });

      let sceneItemId2  = await connection.obsConnection.obs.call("GetSceneItemId", {
        sceneName: "TestScene",
        sourceName: "video"
      });
      connection.obsConnection.obs.call("SetSceneItemEnabled", {
        sceneName: "TestScene",
        sceneItemId: sceneItemId2.sceneItemId,
        sceneItemEnabled: SceneStates.allertState
      });
    });
};

export default IpcInit;