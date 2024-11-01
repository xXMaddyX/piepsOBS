import localStore from "../localStorage/connectionData";

export default class RumbleConnect {
    constructor() {
        this.rumbleApiDataOnLoad = null;
        this.currentrumbleApiData = null;
    };
    async fetchAPIonStart() {
        let url = localStore.rumbleConfig.url;
        let apiKey = localStore.rumbleConfig.apiKey;
        let raw = await fetch(`${url}${apiKey}`);
        this.rumbleApiDataOnLoad = await raw.json();
        console.log(this.rumbleApiDataOnLoad)
    };
};