const { ipcRenderer } = require("electron");

class AlertBoxes extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.activeButton = null;
        this.alertObjList = [];
        this.rentObjList = [];
        this.subObjList = [];
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

        this.alertBoxBody = this.shadow.querySelector('.follower-boxes-body');
        this.rentBoxBody = this.shadow.querySelector('.rant-boxes-body');
        this.subBoxBody = this.shadow.querySelector('.sub-boxes-body');
    };


    setActiveButton(button) {
        if (this.activeButton) {
            this.activeButton.style.backgroundColor = "gray";
        }
        this.activeButton = button;
        this.activeButton.style.backgroundColor = "greenyellow";
    };

    listeners() {
        this.followerActiveButton.addEventListener('click', () => this.setActiveButton(this.followerActiveButton));
        this.rentActiveButton.addEventListener('click', () => this.setActiveButton(this.rentActiveButton));
        this.subscribeActiveButton.addEventListener('click', () => this.setActiveButton(this.subscribeActiveButton));

        this.addEventListener("send-alert-data-to-alert-box", (e) => {
            let data = e.detail.data;
            const newButton = document.createElement("button");
            newButton.innerText = data.sourceName;

            if (this.activeButton === this.followerActiveButton) {
                this.alertBoxBody.append(newButton);
                this.alertObjList.push(data);

            } else if (this.activeButton === this.rentActiveButton) {
                this.rentBoxBody.append(newButton);
                this.rentObjList.push(data);

            } else if (this.activeButton === this.subscribeActiveButton) {
                this.subBoxBody.append(newButton);
                this.subObjList.push(data);
            } else {
                alert("No Alert Box selected");
            };
            console.log(data);
        });
    };

    handelIncomeData(data) {
        
    }

    customEvents() {

    };

    ipcHandler() {

    };
};

customElements.define("alert-boxes", AlertBoxes);