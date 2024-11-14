import { localStore } from "../localStorage/connectionData";
import OBSWebSocket from "obs-websocket-js";
class TimerHandler {
    constructor(obs) {
        /**@type {OBSWebSocket} */
        this.obsCon = obs
        this.followerAlertShow = false;
        this.rentAlertShow = false;
        this.subAlertShow = false;

        this.followerDisabledOnStart = false;
        this.rentDisableOnStart = false;
    };

    async disableAlertOnStart(element) {
        if (element.sceneItemEnabled) {
            let sourceId = await this.obsCon.call("GetSceneItemId", {
                sceneName: element.sceneName,
                sourceName: element.sourceName
            });
            console.log(sourceId)
            this.obsCon.call("SetSceneItemEnabled", {
                sceneName: element.sceneName,
                sceneItemId: sourceId.sceneItemId,
                sceneItemEnabled: false
            });
        } else {
            return
        };
    };

    handleAlertTimer(alertData) {
        if (alertData.length <= 0) return;
        if (!this.followerDisabledOnStart) {
            alertData.forEach(element => {
                this.disableAlertOnStart(element);
            });
            this.followerDisabledOnStart = true;
            return;
        };
        console.log("Trozedem weiter")
    };

    handelRentTimer(alertData) {
        if (alertData.length <= 0) return;
        if (!this.rentDisableOnStart) {
            alertData.forEach(element => {
                this.disableAlertOnStart(element);
            });
            this.followerDisabledOnStart = true;
            return;
        };
    };

    handleSubTimer(alertData) {
        
    };
};

export default TimerHandler;