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
            let liveStream = rumbleAPIData.rumbleStartAPIData.livestreams;
            if (liveStream.length > 0) {
                rumbleAPIData.currentViewsers = liveStream[0].watching_now;
            };
            if (liveStream[0].chat.recent_messages.length > 0) {
                rumbleAPIData.currentChat = liveStream[0].chat.recent_messages;
            };
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

            if (rumbleAPIData.newFollowersNums < rumbleAPIData.currentFollowersNums) {
                rumbleAPIData.currentFollowersNums = rumbleAPIData.newFollowersNums;
            };

            let liveStream = rumbleAPIData.rumbleCurrentAPIData.livestreams;
            if (liveStream.length > 0) {
                rumbleAPIData.currentViewsers = liveStream[0].watching_now;
            };
            if (liveStream[0].chat.recent_messages.length > 0) {
                rumbleAPIData.newChat = liveStream[0].chat.recent_messages;
            };
            console.log(`Is Running ${rumbleAPIData.rumbleCurrentAPIData.username}'s Stream!!!`);
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
