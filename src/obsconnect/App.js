import OBSConnector from "./obsConnect.js";
import OBSinfo from "./obsInfo.js";
import RumbleConnect from "../rumbleConnect/rumbleConnect.js";
import {localStore} from "../localStorage/connectionData.js";

const config = {
    obsConfig: {
        adress: "",
        password: "",
    },
    rumbleConfig: {
        url: "",
        apiKey: "",
    },
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
    initApp = async () => {
        let adress = config.testConfig.adress;
        let pass = config.testConfig.password;

        this.obsConnection = new OBSConnector(adress, pass);
        await this.obsConnection.init();

        this.obsInfo = new OBSinfo(this.obsConnection.obs);
        this.rubleConnection = new RumbleConnect();
    };

    setConfig = () => {
        config.obsConfig.adress = localStore.obsConfig.adress;
        config.obsConfig.password = localStore.obsConfig.password;
        config.rumbleConfig.url = localStore.rumbleConfig.url;
        config.rumbleConfig.apiKey = localStore.rumbleConfig.apiKey;
    };
};