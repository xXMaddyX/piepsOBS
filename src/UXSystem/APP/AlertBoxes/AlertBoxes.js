const { ipcRenderer } = require("electron");

class AlertBoxes extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.activeButton = null;
        this.alertData = {
            alertObjList: [],
            rentObjList: [],
            subObjList: [],
        };
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
        this.sendDataToBackendButton = this.shadow.querySelector('#send-data-to-backend-button');

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
        this.sendDataToBackendButton.addEventListener('click', () => ipcRenderer.invoke("send-alert-data-to-backend", this.alertData));

        this.addEventListener("send-alert-data-to-alert-box", (e) => {
            let data = e.detail.data;
            const buttonContainer = document.createElement("div");
            buttonContainer.classList.add("button-box");

            const newButton = document.createElement("button");
            newButton.innerText = data.sourceName;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "X";
            deleteButton.addEventListener('click', () => {
                newButton.remove();
                deleteButton.remove();
                buttonContainer.remove();

                const targetArray = buttonContainer.targetArray;
                const { sourceName } = data;

                const index = targetArray.findIndex(item => item.sourceName === sourceName);
                if (index !== -1) {
                    targetArray.splice(index, 1);
                };
                console.log(this.alertData);
            });

            buttonContainer.append(newButton, deleteButton);

            if (this.activeButton === this.followerActiveButton) {
                this.alertBoxBody.append(buttonContainer);
                this.alertData.alertObjList.push(data);
                buttonContainer.targetArray = this.alertData.alertObjList;
            
            } else if (this.activeButton === this.rentActiveButton) {
                this.rentBoxBody.append(buttonContainer);
                this.alertData.rentObjList.push(data);
                buttonContainer.targetArray = this.alertData.rentObjList;
            
            } else if (this.activeButton === this.subscribeActiveButton) {
                this.subBoxBody.append(buttonContainer);
                this.alertData.subObjList.push(data);
                buttonContainer.targetArray = this.alertData.subObjList;
            
            } else {
                alert("No Alert Box selected");
            };
        });
    };
};

customElements.define("alert-boxes", AlertBoxes);