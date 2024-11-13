import OBSWebSocket from "obs-websocket-js";
import RumbleConnect from "../rumbleConnect/rumbleConnect";
import AlertData from "../localStorage/alertDataStore";
import { localStore } from "../localStorage/connectionData";

export default class AlertHandler {
    constructor(obs, rumble) {
        /**@type {OBSWebSocket)} */
        this.obs = obs;
        /**@type {RumbleConnect} */
        this.rumble = rumble;
        this.DEFAULT_INTERVALL = 3000;
        this.alertListElements = [];
        this.rentListElements = [];
        this.subListElements = [];
    };

    init() {
        this.setAlertHandlerLoop();
    }

    setAlert() {
        if (AlertData.alertObjList.length > 0) {
            AlertData.alertObjList.forEach(item => {
                const dataObj = {
                    sourceName: item.sourceName,
                    sourceUuid: item.sourceUuid,
                    sceneItemEnabled: item.sceneItemEnabled
                };
                this.alertListElements.push(dataObj);
            });
        } else {
            console.log("no Data in Alert Data");
        };
    };
    
    setRent() {
        if (AlertData.rentObjList.length > 0) {
            AlertData.rentObjList.forEach(item => {
                const dataObj = {
                    sourceName: item.sourceName,
                    sourceUuid: item.sourceUuid,
                    sceneItemEnabled: item.sceneItemEnabled
                };
                this.rentListElements.push(dataObj);
            });
        } else {
            console.log("no Data in Rent Data");
        };
    };
    
    setSubscribtion() {
        if (AlertData.subObjList.length > 0) {
            AlertData.subObjList.forEach(item => {
                const dataObj = {
                    sourceName: item.sourceName,
                    sourceUuid: item.sourceUuid,
                    sceneItemEnabled: item.sceneItemEnabled
                };
                this.subListElements.push(dataObj);
            });
        } else {
            console.log("no Data in Sub Data");
        };
    };
    
    handleDataInLoop = () => {
        console.log("AlertHandler is Running");
    };

    setAlertHandlerLoop = () => {
        setInterval(this.handleDataInLoop, this.DEFAULT_INTERVALL);
    };
};