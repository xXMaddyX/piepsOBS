const { ipcRenderer } = require("electron");

class AlertBoxes extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.followerButtonState = false;
        this.rentButtonState = false;
        this.subscribeButtonState = false;
    };

    async connectedCallback () {
        await this.init();
        this.selectors();
        this.listeners();
        this.customEvents();
        this.ipcHandler();
    };

    async init() {
        const htmlRef = await fetch('/src/UXSystem/APP/AlertBoxes/AlertBoxes.html');
        this.shadow.innerHTML = await htmlRef.text();
    };

    selectors() {
        this.followerActiveButton = this.shadow.querySelector('#follower-alert-activate-button');
        this.rentActiveButton = this.shadow.querySelector('#rant-alert-activate-button');
        this.subscribeActiveButton = this.shadow.querySelector('#subscribe-activate-button');
    };

    listeners() {
        this.followerActiveButton.addEventListener('click', () => {
            this.followerButtonState = !this.followerButtonState;
            if (this.followerButtonState) {
                this.followerActiveButton.style.backgroundColor = "greenyellow"
            } else {
                this.followerActiveButton.style.backgroundColor = "gray";
            };
        });

        this.rentActiveButton.addEventListener('click', () => {
            this.rentButtonState = !this.rentButtonState;
            if (this.rentButtonState) {
                this.rentActiveButton.style.backgroundColor = "greenyellow"
            } else {
                this.rentActiveButton.style.backgroundColor = "gray";
            };
        })

        this.subscribeActiveButton.addEventListener('click', () => {
            this.subscribeButtonState = !this.subscribeButtonState;
            if (this.subscribeButtonState) {
                this.subscribeActiveButton.style.backgroundColor = "greenyellow";
            } else {
                this.subscribeActiveButton.style.backgroundColor = "gray";
            };
        });
    };

    customEvents() {

    };

    ipcHandler() {

    };
};

customElements.define("alert-boxes", AlertBoxes);