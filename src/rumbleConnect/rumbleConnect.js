import { localStore, rumbleAPIData } from "../localStorage/connectionData.js";

export default class RumbleConnect {
    constructor(url) {
        this.url = url;
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
            rumbleAPIData.rumbleStartAPIData = await raw.json();
            rumbleAPIData.currentFollowersNums = rumbleAPIData.rumbleStartAPIData.followers.num_followers;
            //CONSOLE LOG !!!!!!!!!!!!!!!!
            //REMOVE LATER
            console.log(rumbleAPIData.rumbleStartAPIData);
        } catch (err) {
            console.error(err);
        };
    };

    fetchAPIonRun = async () => {
        try {
            let raw = await fetch(this.url);
            rumbleAPIData.rumbleCurrentAPIData = await raw.json();
            rumbleAPIData.newFollowersNums = rumbleAPIData.rumbleCurrentAPIData.followers.num_followers;
            rumbleAPIData.lastFollowerName = rumbleAPIData.rumbleCurrentAPIData.followers.latest_follower.username;
            console.log(`Is Running ${rumbleAPIData.rumbleCurrentAPIData.username}'s Stream!!!`);
            //TEST
            console.log(rumbleAPIData.currentFollowersNums);
            console.log(rumbleAPIData.newFollowersNums);
        } catch (err) {
            console.error(err);
        };
    };

    update = () => {
        if (localStore.rumbleConfig.url === null) {
            return;
        } else {
            setInterval(this.fetchAPIonRun, this.delayCall(5));
        };
    };
};
