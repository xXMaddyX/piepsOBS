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

        this.alertBoxBody = this.shadow.querySelector('.follower-boxes-body');
        this.rentBoxBody = this.shadow.querySelector('.rant-boxes-body');
        this.subBoxBody = this.shadow.querySelector('.sub-boxes-body');
    };

    setButtonCondition(state, button) {
        if (state === true) {
            button.style.backgroundColor = "greenyellow";
        } else {
            button.style.backgroundColor = "gray";
        };
    };

    listeners() {
        this.followerActiveButton.addEventListener('click', () => {
            this.followerButtonState = !this.followerButtonState;
            this.setButtonCondition(this.followerButtonState, this.followerActiveButton)
        });

        this.rentActiveButton.addEventListener('click', () => {
            this.rentButtonState = !this.rentButtonState;
            this.setButtonCondition(this.rentButtonState, this.rentActiveButton);
        })

        this.subscribeActiveButton.addEventListener('click', () => {
            this.subscribeButtonState = !this.subscribeButtonState;
            this.setButtonCondition(this.subscribeButtonState, this.subscribeActiveButton);
        });

        this.addEventListener("send-alert-data-to-alert-box", (e) => {
            let data = e.detail.data;
            if (this.followerButtonState) {
                const newButton = document.createElement("button");
                newButton.innerText = e.detail.data.sourceName;
                this.alertBoxBody.append(newButton);
            } else if (this.rentButtonState) {
                const newButton = document.createElement("button");
                newButton.innerText = e.detail.data.sourceName;
                this.rentBoxBody.append(newButton);
            } else if (this.subscribeButtonState) {
                const newButton = document.createElement("button");
                newButton.innerText = e.detail.data.sourceName;
                this.subBoxBody.append(newButton);
            } else {
                alert("no Box selected")
            }
            
            console.log(data)
        })
    };

    handelIncomeData(data) {
        
    }

    customEvents() {

    };

    ipcHandler() {

    };
};

customElements.define("alert-boxes", AlertBoxes);