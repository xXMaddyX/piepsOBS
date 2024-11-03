import '/src/UXSystem/MenuBar/menuBar.js';

export default class MainApp extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: "open"})
    };

    async connectedCallback() {
        await this.init();
        return;
    };
    
    async init() {
        try {
            const htmlRes = await fetch('/src/UXSystem/APP/App.html');
            this.shadow.innerHTML = await htmlRes.text();
        } catch (err) {
            console.error(err);
            return;
        }
        const menuBarSelector = this.shadow.querySelector('.app-menu-bar');
        const menuBar = document.createElement("menu-bar");
        menuBarSelector.append(menuBar);
        return;
    };
};