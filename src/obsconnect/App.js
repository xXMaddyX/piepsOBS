import OBSConnector from "./obsCOnnect.js";
import OBSinfo from "./obsInfo.js";
import RumbleConnect from "../rumbleConnect/rumbleConnect.js";
import {localStore} from "../localStorage/connectionData.js";

const config = {
    testConfig: {
        adress: 'ws://localhost:4455',
        password: 'C3kqcIQ6A0agUdWo'
    }
}

export default class App {
    constructor() {
        this.obsConnection = null;
        this.rubleConnection = null;
        this.obsInfo = null;
    };

    /**Init Piep´s OBS Application */
    initObsConnect = async () => {
        let adress = localStore.obsConfig.adress;
        let pass = localStore.obsConfig.password;

        this.obsConnection = new OBSConnector(adress, pass);
        await this.obsConnection.init();
        this.obsInfo = new OBSinfo(this.obsConnection.obs);
    };
    
    initRumbleConnect = async () => {
        let url = localStore.rumbleConfig.url;
        this.rubleConnection = new RumbleConnect(url);
        await this.rubleConnection.fetchAPIonStart();
        this.rubleConnection.update();
    };
};