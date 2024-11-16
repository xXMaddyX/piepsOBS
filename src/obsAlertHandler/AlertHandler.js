import OBSWebSocket from "obs-websocket-js";
import RumbleConnect from "../rumbleConnect/rumbleConnect";
import AlertData from "../localStorage/alertDataStore";
import TimerHandler from "./handlerCallsAndTimer.js";
import { localStore } from "../localStorage/connectionData";

export default class AlertHandler {
    constructor(obs, rumble) {
        /**@type {OBSWebSocket)} */
        this.obs = obs;
        /**@type {RumbleConnect} */
        this.rumble = rumble;
        this.DEFAULT_INTERVALL = 1000;
        this.alertListElements = [];
        this.rentListElements = [];
        this.subListElements = [];
        this.chatListElements = [];
    };

    init() {
        this.callHandler =  new TimerHandler(this.obs);
        this.setAlertHandlerLoop();
    }

    setAlert() {
        if (AlertData.alertObjList.length > 0) {
            AlertData.alertObjList.forEach(item => {
                const dataObj = {
                    inputKind: item.inputKind,
                    sceneName: item.sceneName,
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
                    inputKind: item.inputKind,
                    sceneName: item.sceneName,
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
                    inputKind: item.inputKind,
                    sceneName: item.sceneName,
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

    setChat() {
        if (AlertData.chatObjList.length > 0) {
            AlertData.chatObjList.forEach(item => {
                const dataObj = {
                    inputKind: item.inputKind,
                    sceneName: item.sceneName,
                    sourceName: item.sourceName,
                    sourceUuid: item.sourceUuid,
                    sceneItemEnabled: item.sceneItemEnabled
                };
                this.chatListElements.push(dataObj);
            });
        } else {
            console.log("no Data in Chat Data");
        };
    };
    
    handleDataInLoop = () => {
        this.callHandler.handleAlertTimer(this.alertListElements);
    };

    setAlertHandlerLoop = () => {
        setInterval(this.handleDataInLoop, this.DEFAULT_INTERVALL);
    };
};