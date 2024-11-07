const { ipcRenderer } = require("electron");

class ObsSceneInfoBox extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    };

    async connectedCallback() {
        await this.init();
        this.selectors();
        this.listeners();
        this.customEvents();
    };

    async init() {
        const htmlRef = await fetch("/src/UXSystem/APP/ObsSceneInfoBox/ObsSceneInfoBox.html");
        this.shadow.innerHTML = await htmlRef.text();
    };

    selectors() {
        this.obsSceneNames = document.querySelector('.obs-scene-info-scene-names');
        this.obsSceneObjects = document.querySelector('.obs-scene-info-source-names');
    };

    renderSceneNames() {

    };

    renderSceneSources() {

    };

    listeners() {
        this.addEventListener('obs-scene-data-loadet', () => {
            console.log("Event Triggered")
        });
    };

    customEvents() {

    };
};

customElements.define("obs-scene-info-box", ObsSceneInfoBox);