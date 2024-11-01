import OBSWebSocket from "obs-websocket-js";

export default class OBSConnector {
    constructor(adress, password) {
        this.obs = null;
        this.adress = adress;
        this.password = password;
    };

    async init() {
        this.obs = new OBSWebSocket();
        await this.connectOBS();
    };

    async connectOBS() {
        try {
            await this.obs.connect(this.adress, this.password);
            console.log(`Connected to OBS at: Adress: ${this.adress}`);
        } catch (err) {
            console.error("Failes to connect:", err);
        };
    };
};