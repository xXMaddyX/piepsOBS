import OBSConnector from "./obsConnect.js";
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
    
    initRumbleConnect() {
        this.rubleConnection = new RumbleConnect();
    }

    setConfig = () => {
        config.obsConfig.adress = localStore.obsConfig.adress;
        config.obsConfig.password = localStore.obsConfig.password;
        config.rumbleConfig.url = localStore.rumbleConfig.url;
        config.rumbleConfig.apiKey = localStore.rumbleConfig.apiKey;
    };
};