const { ipcRenderer } = require("electron");

class ChatAndFollower extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"});
        this.activeButton = null;
    };
    async connectedCallback() {
        await this.init();
        this.selectors();
        this.listeners();
    };
    
    async init() {
        const htmlRef = await fetch("/src/UXSystem/APP/ChatBoxAndFollower/ChatAndFollower.html");
        this.shadow.innerHTML = await htmlRef.text();
    };

    selectors() {
        this.chatBoxButton = this.shadow.querySelector("#chat-box-activate-button");
        this.followerButton = this.shadow.querySelector('#follower-box-active-button');

        this.chatBoxBody = this.shadow.querySelector('.chat-box-body');
        this.followerBoxBody = this.shadow.querySelector('.follower-box-body');
    };

    setActiveButton(button) {
        if (this.activeButton) {
            this.activeButton.style.backgroundColor = "gray";
        }
        this.activeButton = button;
        this.activeButton.style.backgroundColor = "greenyellow";
    };

    listeners() {
        this.chatBoxButton.addEventListener('click', () => this.setActiveButton(this.chatBoxButton));
        this.followerButton.addEventListener('click', () => this.setActiveButton(this.followerButton));
    };
};

customElements.define("chat-and-follower", ChatAndFollower);