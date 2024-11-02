import '/src/UXSystem/MenuBar/menuBar.js';

export default class MainApp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"})
    };

    async connectedCallback() {
        await this.init();
    };
    
    async init() {
        const htmlRes = await fetch('/src/UXSystem/APP/App.html');
        this.shadow.innerHTML = await htmlRes.text();
    
        const menuBarSelector = this.shadow.querySelector('.app-menu-bar');
        const menuBar = document.createElement("menu-bar");
        menuBarSelector.append(menuBar);
    };
};