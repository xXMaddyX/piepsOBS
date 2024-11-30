import { rumbleAPIData } from "../localStorage/connectionData";
import OBSWebSocket from "obs-websocket-js";
class TimerHandler {
    constructor(obs) {
        /**@type {OBSWebSocket} */
        this.obsCon = obs
        this.followerAlertShow = false;
        this.rentAlertShow = false;
        this.subAlertShow = false;

        //FOLLOWER_ALERT--------------------->
        this.followerDisabledOnStart = false;
        this.FOLLOWER_SHOW_TIMER = 8;
        this.DEFAULT_FOLLOWER_SHOW_TIMER = 8;
        this.showFollower = false;
        this.followerHidden = false;

        //RENT_ALERT_STATES------------------>
        this.rentDisableOnStart = false;

        //CHAT_STATES------------------------>
        this.currentChatLength = 0;
        this.newChatLength = 0;

        //REMOVE_ON_PRODUCTION
        this.testNumber = 2
    };

    async disableAlertOnStart(element) {
        if (element.sceneItemEnabled) {
            let sourceId = await this.obsCon.call("GetSceneItemId", {
                sceneName: element.sceneName,
                sourceName: element.sourceName
            });
            //console.log(sourceId)
            this.obsCon.call("SetSceneItemEnabled", {
                sceneName: element.sceneName,
                sceneItemId: sourceId.sceneItemId,
                sceneItemEnabled: false
            });
        } else {
            return
        };
    };
    //---------------------------------------------------------------------------
    //---------------------------->>>>FOLLOWER_ALERTS<<<<------------------------
    //SHOW_AND_HIDE_FUNCTIONS---------------------->
    async showFollowerElement(element) {
        let sourceId = await this.obsCon.call("GetSceneItemId", {
            sceneName: element.sceneName,
            sourceName: element.sourceName
        });
        if (element.inputKind === "text_gdiplus_v3") {
            await this.obsCon.call("SetInputSettings", {
                inputName: element.sourceName,
                inputSettings: {
                    text: `New Follower: ${rumbleAPIData.lastFollowerName}`
                }
            });
        };
        this.obsCon.call("SetSceneItemEnabled", {
            sceneName: element.sceneName,
            sceneItemId: sourceId.sceneItemId,
            sceneItemEnabled: true,
        });
    };

    async hideFollowerElement(element) {
        let sourceId = await this.obsCon.call("GetSceneItemId", {
            sceneName: element.sceneName,
            sourceName: element.sourceName
        });
        this.obsCon.call("SetSceneItemEnabled", {
            sceneName: element.sceneName,
            sceneItemId: sourceId.sceneItemId,
            sceneItemEnabled: false,
        });
    };

    //LOOP_FOLLOWER_HANDLER------------------------->
    handleAlertTimer(alertData) {
        if (alertData.length <= 0) return;
        if (!this.followerDisabledOnStart) {
            alertData.forEach(element => {
                this.disableAlertOnStart(element);
            });
            this.followerDisabledOnStart = true;
            return;
        };
        this.checkForFollowerChange();
        if (this.showFollower) {
            this.showFollowerTimer();
            alertData.forEach(element => {
                if (!element.sceneItemEnabled) {
                    this.showFollowerElement(element);
                } else {
                    return
                };
            });
        } else {
            if (this.followerHidden) return;
            alertData.forEach(element => {
                this.hideFollowerElement(element);
            });
            this.followerHidden = true;
        };
    };
    //TIMER_FUNCTION--------------------------------->
    showFollowerTimer() {
        if (this.FOLLOWER_SHOW_TIMER > 0) {
            this.FOLLOWER_SHOW_TIMER -= 1;
        } else {
            this.showFollower = false;
            this.FOLLOWER_SHOW_TIMER = this.DEFAULT_FOLLOWER_SHOW_TIMER;
        }
    }
    //CHECK_FOR_CHANGES_IN_FOLLOWERS----------------->
    checkForFollowerChange() {
        if (rumbleAPIData.currentFollowersNums < rumbleAPIData.newFollowersNums) {
            this.showFollower = true;
            this.followerHidden = false;
            rumbleAPIData.currentFollowersNums = rumbleAPIData.newFollowersNums;
        };
    };
    //-------------------------------------------------------------------------------------
    //--------------------------->>>>RENT_ALERTS<<<<---------------------------------------
    handelRentTimer(alertData) {
        if (alertData.length <= 0) return;
        if (!this.rentDisableOnStart) {
            alertData.forEach(element => {
                this.disableAlertOnStart(element);
            });
            this.followerDisabledOnStart = true;
            return;
        };
    };
    //-------------------------------------------------------------------------------------
    //------------------------>>>>SUBSCRIPER_ALLERTS---------------------------------------
    handleSubTimer(alertData) {

    };

    //-------------------------------------------------------------------------------------
    //------------------------------->>>>HANDLE_CHAT<<<<-----------------------------------
    async handelChat(alertData) {
        if (rumbleAPIData.newChat != null && rumbleAPIData.currentChat != null) {
            if (rumbleAPIData.newChat.length > rumbleAPIData.currentChat.length) {
                let chatDifference = rumbleAPIData.newChat.length - rumbleAPIData.currentChat.length;
                for (let i = chatDifference - 1; i >= 0; i--) {
                    for (let item of alertData) {
                        if (item.inputKind === "text_gdiplus_v3") {
                            await this.addMSGToOBSChatWindow(item, rumbleAPIData.newChat[i].username, rumbleAPIData.newChat[i].text);
                        };
                    };
                    //console.log(rumbleAPIData.newChat[i]);
                };
                rumbleAPIData.currentChat = rumbleAPIData.newChat;
            };
        }
    };

    async addMSGToOBSChatWindow(element, username, msg) {
        const response = await this.obsCon.call("GetInputSettings", {
            inputUuid: element.sourceUuid,
        });
        const currentText = response.inputSettings.text || '';
        const newText = `${currentText}\n${username}${"⭐"}: ${msg}`;
    
        let lines = newText.split('\n');
        if (lines.length > 50) {
            lines = lines.slice(lines.length - 50);
        }
        const limitedText = lines.join('\n');
        await this.obsCon.call("SetInputSettings", {
            inputUuid: element.sourceUuid,
            inputSettings: {
                text: limitedText
            }
        });
    };
    
};

export default TimerHandler;