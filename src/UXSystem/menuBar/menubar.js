const { ipcRenderer } = require("electron");
import { menuBarHTML } from "./menuBarHTML.js";

export default class MenuBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.dropDownVisible = false;
    }

    async connectedCallback() {
        await this.init();
        return;
    };
    
    async init() {
        try {
            //Disable for Production
            const htmlRes = await fetch("/src/UXSystem/MenuBar/menuBar.html");
            this.shadow.innerHTML = await htmlRes.text();

            //this.shadow.innerHTML = menuBarHTML;
        } catch (err) {
            console.log(err)
            return;
        };
        this.selectors();
        this.logic();
        this.customEvents();
        return;
    };
    
    selectors() {
        this.saveSettings = this.shadow.querySelector('#save-conf-btn');
        this.dropdown = this.shadow.querySelector('.button-dropdown');
        this.menuBtn = this.shadow.querySelector('#menu-button');
        this.exitButton = this.shadow.querySelector('#exit-btn');
        this.obsConBtn = this.shadow.querySelector('#obs-connect-btn');
        this.rumbleConBtn = this.shadow.querySelector('#rumble-connect-btn');
    };

    toggleDropdown() {
        this.dropDownVisible = !this.dropDownVisible;
        if (this.dropDownVisible) {
            this.dropdown.classList.add("open");
        } else {
            this.dropdown.classList.remove("open");
        };
    };
    
    logic() {
        document.addEventListener("click", (e) => {
        const path = e.composedPath();
        if (!path.includes(this) && !path.includes(this.menuBtn)) {
            this.dropdown.classList.remove("open");
            this.dropDownVisible = false;
            };
        });
        this.menuBtn.addEventListener('click', (e) => {
            this.toggleDropdown();
        });
        this.exitButton.addEventListener('click', () => {
            ipcRenderer.invoke("exitProgramm");
        });

        //CONNECTION BUTTONS RUMBLE AND OBS
        this.obsConBtn.addEventListener('click', () => {
            this.dispatchEvent(this.clickObsConEvent);
        });
        this.rumbleConBtn.addEventListener('click', () => {
            this.dispatchEvent(this.clickRumbleConEvent);
        });

        //SAVE_SETTINGS_BUTTONS
        this.saveSettings.addEventListener('click', () => {
            ipcRenderer.invoke("save-settings-event");
            console.log("clicked")
        });
        
    };

    customEvents() {
        this.clickObsConEvent = new CustomEvent("open-obs-input-window", {
            bubbles: true,
            composed: true
        });

        this.clickRumbleConEvent = new CustomEvent("open-rumble-input-window", {
            bubbles: true,
            composed: true
        });
    };
};

customElements.define("menu-bar", MenuBar);