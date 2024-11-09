const { ipcRenderer } = require("electron");
import { FrontendStoreGlobal } from "../../frontendStore/frontendStore";

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
        this.obsSceneNames = this.shadow.querySelector('.obs-scene-info-scene-names');
        this.obsSceneObjects = this.shadow.querySelector('.obs-scene-info-source-names');

        this.obsSceneInfoButtons = this.shadow.querySelector('.obs-scene-info-scenes-buttons');
        this.obsSourceInfoButtons = this.shadow.querySelector('.obs-scene-info-sources-container');
    };

    listeners() {
        this.addEventListener('obs-scene-data-loadet', () => {
            console.log(FrontendStoreGlobal.obsDataStore);
            this.obsSourceInfoButtons.innerHTML = ""

            FrontendStoreGlobal.obsDataStore.forEach(item => {
                const obsSceneButton = document.createElement("button");
                obsSceneButton.classList.add("obs-scene-info-buttons");
                obsSceneButton.textContent = item.sceneName;

                obsSceneButton.addEventListener('click', () => {
                    this.obsSourceInfoButtons.innerHTML = "";
                    const dataArr = item.sceneSourcesList;

                    dataArr.forEach(elem => {
                        const sourceButton = document.createElement("button");
                        sourceButton.classList.add("obs-source-info-buttons");
                        sourceButton.textContent = elem.sourceName;
                        sourceButton.addEventListener('click', () => {
                            console.log(elem);
                        });
                        
                        this.obsSourceInfoButtons.append(sourceButton);
                    });
                });

                this.obsSceneInfoButtons.append(obsSceneButton);
            });
        });
    };
    //NEED TO ADD THE EVENT TO SET IT TO AN CUSTOM ALERT!!!!!!!!!!!!!!!!!!!!!!!!
    customEvents(dataOfButton, targetAlert) {
        this.sendButtonToConfig =  new CustomEvent("send-button-to-config", {
            detail: {
                data: dataOfButton,
                target: targetAlert
            },
            bubbles: true,
            composed: true
        });
    };
};

customElements.define("obs-scene-info-box", ObsSceneInfoBox);