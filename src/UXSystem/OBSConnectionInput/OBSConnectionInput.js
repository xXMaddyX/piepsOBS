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
    };

    listeners() {
        this.obsOkBtn.addEventListener('click', () => {
            console.log("Send Data to LocalStorage")
        });

        this.obsCancelBtn.addEventListener('click', () => {
            console.log("Event triggert")
            this.dispatchEvent(this.obsCancelBtnEvent);
        });
    };

    customEvents() {
        this.obsOkBtnEvent = new CustomEvent("obs-ok-btn-event", {
            bubbles: true,
            composed: true
        });

        this.obsCancelBtnEvent = new CustomEvent("obs-cancel-btn-event", {
            bubbles: true,
            composed: true
        });
    }
};


customElements.define("obs-connection-input", OBSConnectionInput);