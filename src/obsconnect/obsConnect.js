import OBSWebSocket from "obs-websocket-js";

export default class OBSConnector {
    constructor(adress, password) {
        this.obs = null;
        this.adress = adress;
        this.password = password;
        this.obsSceneData = [];
    };

    init = async () => {
        this.obs = new OBSWebSocket();
        await this.connectOBS();
        return;
    };

    connectOBS = async () => {
        try {
            await this.obs.connect(this.adress, this.password);
            console.log(`Connected to OBS at: Adress: ${this.adress}`);
        } catch (err) {
            console.error("Failes to connect:", err);
            return;
        };
    };

    /**
     * @returns Object Array of {sceneName, sceneSourcesList<Array>[objects]}
     */
    getSceneData = async () => {
        try {
            const sceneNameList = await this.obs.call("GetSceneList");
            for (let item of sceneNameList.scenes) {
                this.obsSceneData.push({sceneName: item.sceneName, sceneSourcesList: []});
            };
        } catch (err) {
            console.log("Data not Ready", err);
        };
        try {
            for (let item of this.obsSceneData) {
                const sceneSourceData = await this.obs.call("GetSceneItemList", {
                    sceneName: item.sceneName
                });
                sceneSourceData.sceneItems.forEach(element => {
                    item.sceneSourcesList.push({
                        inputKind: element.inputKind,
                        sceneItemEnabled: element.sceneItemEnabled,
                        sceneItemId: element.sceneItemId,
                        sceneItemIndex: element.sceneItemIndex,
                        sourceName: element.sourceName,
                        sourceUuid: element.sourceUuid
                    });
                });
            };
        } catch (err) {
            console.error(new Error("Can't get Scene Item List", err));
        };
        return this.obsSceneData;
    };
};