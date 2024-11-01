import OBSWebSocket from "obs-websocket-js";

export default class OBSinfo {
    constructor(obs) {
        /**@type {OBSWebSocket} */
        this.obs = obs;
    };

    async getVersion() {
        let obsVersion = await this.obs.call("GetVersion");
        console.log(`Current OBS Version: ${obsVersion.obsVersion}`);
        console.log(`Current RPC Version: ${obsVersion.rpcVersion}`);
    };
};