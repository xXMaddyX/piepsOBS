import { localStore, rumbleAPIData } from "../localStorage/connectionData.js";

export default class RumbleConnect {
    constructor() {
        this.rumbleApiDataOnLoad = null;
        this.currentrumbleApiData = null;
    };
    fetchAPIonStart = async () => {
        try {
            let url = localStore.rumbleConfig.url;
            let apiKey = localStore.rumbleConfig.apiKey;
            let raw = await fetch(`${url}${apiKey}`);
            this.rumbleApiDataOnLoad = await raw.json();
            this.saveToLocalStorage()
            
        } catch (err) {
            console.error(err)
        }
    };

    saveToLocalStorage = () => {
        rumbleAPIData.numOfFollowers = this.rumbleApiDataOnLoad.followers.num_followers;
        console.log(this.rumbleApiDataOnLoad)
    };

    update = () => {
        setInterval(this.fetchAPIonStart, 1000)
    }
};