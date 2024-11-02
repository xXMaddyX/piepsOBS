const { ipcRenderer } = require("electron");

export default class MenuBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
    }

    async connectedCallback() {
        await this.init();
    };
    
    async init() {
        const htmlRes = await fetch("/src/UXSystem/MenuBar/menuBar.html");
        this.shadow.innerHTML = await htmlRes.text();
        this.selectors();
    };
    
    selectors() {
        this.h1Element = this.shadow.querySelector('#text');
        this.button = this.shadow.querySelector('#button');
        this.logic();
    };
    
    logic() {
        //this.button.addEventListener('click', async () => {
            //let data = await ipcRenderer.invoke("getObsVersion");
            //this.h1Element.textContent = await data;
        //});
    };
};

customElements.define("menu-bar", MenuBar);