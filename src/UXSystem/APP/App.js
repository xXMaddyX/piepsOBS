import '/src/UXSystem/MenuBar/menuBar.js';
import '/src/UXSystem/OBSConnectionInput/OBSConnectionInput.js';
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
            const htmlRes = await fetch('/src/UXSystem/APP/App.html');
            this.shadow.innerHTML = await htmlRes.text();
        } catch (err) {
            console.error(err);
            return;
        };
        this.selectors();
        this.createAndAppendElements();
        this.listeners();
        return;
    };
    selectors() {
        this.appBox = this.shadow.querySelector('.app-box');
        this.menuBarSelector = this.shadow.querySelector('.app-menu-bar');
        this.connectObsBtn = this.shadow.querySelector('#connect-to-obs');
    }
    
    createAndAppendElements() {
        this.menuBar = document.createElement("menu-bar");
        this.obsConWindow = document.createElement("obs-connection-input");
        this.obsConWindow.classList.add("obs-connection-input-window");
        
        this.menuBarSelector.append(this.menuBar);
        this.appBox.append(this.obsConWindow);
    };

    listeners() {
        this.addEventListener("open-obs-input-window", () => {
            this.obsConWindow.classList.add('open');
        });
        this.addEventListener("obs-close-window-event", () => {
            this.obsConWindow.classList.remove('open');
        });
        this.connectObsBtn.addEventListener('click', () => {
            ipcRenderer.invoke("connect-to-obs");
        });
    }
};