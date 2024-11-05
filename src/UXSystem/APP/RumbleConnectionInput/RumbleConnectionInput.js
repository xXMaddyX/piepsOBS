const { ipcRenderer } = require("electron");
import { localStore } from "../../../localStorage/connectionData";

class RumbleConnectInput extends HTMLElement {
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
        const htmlRes = await fetch("/src/UXSystem/APP/RumbleConnectionInput/RumbleConnectionInput.html");
        this.shadow.innerHTML = await htmlRes.text();
        
    };

    selectors() {
        this.input = this.shadow.querySelector('#rumble-connect-inp');
        this.okButton = this.shadow.querySelector('#rumble-ok-btn');
        this.cancelButton = this.shadow.querySelector('#rumble-cancel-btn');
    };

    listeners() {
        this.okButton.addEventListener('click', () => {
            if (this.input.value != "") {
                localStore.rumbleConfig.url = this.input.value;
                this.input.value = "";
                this.dispatchEvent(this.closeRumbleInp);
            } else {
                this.input.value = "Enter a Valid URL Key";
                this.input.style.color = "red";
            };
        });

        this.input.addEventListener('click', () => {
            if (this.input.style.color === "red") {
                this.input.style.color = "black";
                this.input.value = "";
            };
        });

        this.cancelButton.addEventListener('click', () => {
            this.dispatchEvent(this.closeRumbleInp);
        });
    };

    customEvents() {
        this.closeRumbleInp = new CustomEvent("close-rumble-window", {
            bubbles: true,
            composed: true
        });
    };
};

customElements.define("rumble-connect-input", RumbleConnectInput);