class RumbleConnectInput extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
    };

    async connectedCallback() {
        await this.init();
    };

    async init() {
        const htmlRes = await fetch("/src/UXSystem/APP/RumbleConnectionInput/RumbleConnectionInput.html");
        this.shadow.innerHTML = await htmlRes.text();
        
    };

    selectors() {

    };

    listeners() {

    };

    customEvents() {

    };
};

customElements.define("rumble-connect-input", RumbleConnectInput);