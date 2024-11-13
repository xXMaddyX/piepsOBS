import { localStore } from "../localStorage/connectionData";
import OBSWebSocket from "obs-websocket-js";
class TimerHandler {
    constructor() {
        this.followerAlertShow = false;
        this.rentAlertShow = false;
        this.subAlertShow = false;
    };

    handleAlertTimer(obs, alertData) {
        /**@type {OBSWebSocket} */
        this.obsCon = obs;
        this.alertData = alertData;
        console.log(alertData)
    }

    handelRentTimer() {

    };

    handleSubTimer() {

    };
};

const timerHandler = new TimerHandler();

export default timerHandler;