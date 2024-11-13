import { localStore, rumbleAPIData } from "../localStorage/connectionData.js";

export default class RumbleConnect {
    constructor(url) {
        this.url = url;
        this.rumbleApiDataOnLoad = null;
        this.currentrumbleApiData = null;
    };
    /**
     * Takes Seconds for Delay * 1000ms
     * @param {number} delay 
     * @returns {number}
     */
    delayCall(delay) {
        return delay * 1000;
    };

    fetchAPIonStart = async () => {
        try {
            let raw = await fetch(this.url);
            this.rumbleApiDataOnLoad = await raw.json();
            this.saveToLocalStorage();
            //CONSOLE LOG !!!!!!!!!!!!!!!!
            //REMOVE LATER
            console.log(this.rumbleApiDataOnLoad);
        } catch (err) {
            console.error(err);
        };
    };

    fetchAPIonRun = async () => {
        try {
            let raw = await fetch(this.url);
            this.currentrumbleApiData = await raw.json();
            console.log(`Is Running ${this.currentrumbleApiData.username}'s Stream!!!`);
        } catch (err) {
            console.error(err);
        };
    };

    saveToLocalStorage = () => {
        rumbleAPIData.numOfFollowers = this.rumbleApiDataOnLoad.followers.num_followers;
        //console.log(this.rumbleApiDataOnLoad);
    };

    update = () => {
        if (localStore.rumbleConfig.url === null) {
            return;
        } else {
            setInterval(this.fetchAPIonRun, this.delayCall(5));
        };
    };
};
