import '/src/UXSystem/MenuBar/menuBar.js';
import '/src/UXSystem/OBSConnectionInput/OBSConnectionInput.js';
import '/src/UXSystem/APP/RumbleConnectionInput/RumbleConnectionInput.js';
import '/src/UXSystem/APP/ObsSceneInfoBox/ObsSceneInfoBox.js';
import '/src/UXSystem/APP/AlertBoxes/AlertBoxes.js';
import { AppHTML } from './AppHTML.js';
import { FrontendStoreGlobal } from '../frontendStore/frontendStore.js';
const { ipcRenderer } = require("electron");

export default class MainApp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    };

    async connectedCallback() {
        await this.init();
        return;
    };
    
    async init() {
        try {
            //Disable for Production
            const htmlRes = await fetch('/src/UXSystem/APP/App.html');
            this.shadow.innerHTML = await htmlRes.text();

            //this.shadow.innerHTML = AppHTML;
        } catch (err) {
            console.error(err);
            return;
        };
        this.selectors();
        this.createAndAppendElements();
        this.listeners();
        this.customEvents();
        return;
    };
    selectors() {
        this.appBox = this.shadow.querySelector('.app-box');
        this.menuBarSelector = this.shadow.querySelector('.app-menu-bar');
        this.connectObsBtn = this.shadow.querySelector('#connect-to-obs');

        this.AppSceneInfoContent = this.shadow.querySelector('.app-main-scene-info');
        this.AppAlertContent = this.shadow.querySelector('.app-main-set-alerts');
        this.AppChatContent = this.shadow.querySelector('.app-main-set-chat');
        
        //Test Item Remove it later
        this.testAlert = this.shadow.querySelector('#test-Alert');
    }
    
    createAndAppendElements() {
        this.menuBar = document.createElement("menu-bar");

        //OBS_Connection_Component
        this.obsConWindow = document.createElement("obs-connection-input");
        this.obsConWindow.classList.add("obs-connection-input-window");

        //RUMBLE_CONNECTION_COMPONENT
        this.rumbleConWindow = document.createElement("rumble-connect-input");
        this.rumbleConWindow.classList.add("rumble-connect-input-window");

        //APPEND_ELEMENTS_TO_MAIN_APP_COMPONENT
        this.menuBarSelector.append(this.menuBar);
        this.appBox.append(this.obsConWindow, this.rumbleConWindow);

        //APP_MAIN_CONTENT
        this.obsSceneInfoBox = document.createElement('obs-scene-info-box');
        this.AppSceneInfoContent.append(this.obsSceneInfoBox);

        //ALERT_COMPONENTS
        this.alertContentBox = document.createElement('alert-boxes');
        this.AppAlertContent.append(this.alertContentBox);
    };

    listeners() {
        //OBS_INPUT_WINDOW
        this.addEventListener("open-obs-input-window", () => {
            this.obsConWindow.classList.add('open');
        });
        this.addEventListener("obs-close-window-event", () => {
            this.obsConWindow.classList.remove('open');
        });

        //RUMBLE_INPUT_WINDOW
        this.addEventListener("open-rumble-input-window", () => {
            this.rumbleConWindow.classList.add('open');
        });
        this.addEventListener("close-rumble-window", () => {
            this.rumbleConWindow.classList.remove('open');
        });

        this.addEventListener("send-data-for-alert-box", (e) => {
            let data = e.detail.data;
            this.sendAlertDataToAlertBox.detail.data = data;
            this.alertContentBox.dispatchEvent(this.sendAlertDataToAlertBox);
        });

        this.connectObsBtn.addEventListener('click', () => {
            ipcRenderer.invoke("connect-to-obs");
        });
        //Test Item Remove
        this.testAlert.addEventListener('click', () => {
            ipcRenderer.invoke("test-Alert");
        });

        ipcRenderer.on("obs-api-data", (e, data) => {
            FrontendStoreGlobal.setObsDataStore(data);
            this.obsSceneInfoBox.dispatchEvent(this.obsDataLoadetEvent);
        });
    };
    customEvents() {
        this.obsDataLoadetEvent = new CustomEvent("obs-scene-data-loadet", {
            bubbles: true,
            composed: true,
        });

        this.sendAlertDataToAlertBox = new CustomEvent("send-alert-data-to-alert-box", {
            detail: {
                data: null
            }
        });
    };
};