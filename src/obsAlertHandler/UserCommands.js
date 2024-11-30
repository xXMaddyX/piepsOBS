import OBSWebSocket from 'obs-websocket-js';

class UserCommands {
    constructor(obsConnect, scene, object, duration) {
        /**@type {OBSWebSocket} */
        this.obs = obsConnect;
        this.scene = scene;
        this.object =  object;
        this.duration = duration;
        this.DEFAULT_DURATION = 3000;
    };

    create() {
        
    };

    destroy() {

    };

    //MAIN_LOOP_UPDATE----------------------------------->
    update() {

    };
};


export default UserCommands;