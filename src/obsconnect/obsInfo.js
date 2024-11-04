import OBSWebSocket from "obs-websocket-js";

export default class OBSinfo {
    constructor(obs) {
        /**@type {OBSWebSocket} */
        this.obs = obs;
    };
    /**Get Version Informations About OBS Version thet is installed on System */
    getVersion = async () => {
        try {
            let obsVersion = await this.obs.call("GetVersion");
            console.log(`Current OBS Version: ${obsVersion.obsVersion}`);
            console.log(`Current RPC Version: ${obsVersion.rpcVersion}`);
        } catch (err) {
            console.error("Cant get Version", err);
            return;
        };
    };
};