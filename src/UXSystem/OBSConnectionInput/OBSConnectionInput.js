const { ipcRenderer } = require("electron");

class OBSConnectionInput extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    };

    async connectedCallback() {
        await this.init();
    }
    async init() {
        try {
            const htmlRes = await fetch("/src/UXSystem/OBSConnectionInput/OBSConnectionInput.html");
            this.shadow.innerHTML = await htmlRes.text();
        } catch (err) {
            console.error(err);
            return;
        };
        this.selectors();
        this.listeners();
        this.customEvents();
        return;
    };

    selectors() {
        this.obsOkBtn = this.shadow.querySelector('#obs-ok-btn');
        this.obsCancelBtn = this.shadow.querySelector('#obs-cancel-btn');
        this.obsAdressInp = this.shadow.querySelector("#obs-adress");
        this.obsPasswordInp = this.shadow.querySelector("#obs-password");

        this.obsAdressInp.value = "ws://localhost:4455";
    };

    listeners() {
        this.obsOkBtn.addEventListener('click',async () => {
            let dataObj = {
                adress: this.obsAdressInp.value,
                password: this.obsPasswordInp.value,
            };
            ipcRenderer.invoke("set-obs-data", dataObj);
            this.dispatchEvent(this.obsCloseWindowEvent);
        });

        this.obsCancelBtn.addEventListener('click', () => {
            console.log("Event triggert")
            this.dispatchEvent(this.obsCloseWindowEvent);
        });
    };

    customEvents() {
        this.obsCloseWindowEvent = new CustomEvent("obs-close-window-event", {
            bubbles: true,
            composed: true
        });
    };
};


customElements.define("obs-connection-input", OBSConnectionInput);