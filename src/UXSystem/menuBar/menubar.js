const { ipcRenderer } = require("electron");

export default class MenuBar extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({mode: 'open'});
        this.dropDownVisible = false;
    }

    async connectedCallback() {
        await this.init();
        return;
    };
    
    async init() {
        try {
            const htmlRes = await fetch("/src/UXSystem/MenuBar/menuBar.html");
            this.shadow.innerHTML = await htmlRes.text();
        } catch (err) {
            console.log(err)
            return;
        };
        this.selectors();
        return;
    };
    
    selectors() {
        this.dropdown = this.shadow.querySelector('.button-dropdown');
        this.menuBtn = this.shadow.querySelector('#menu-button');
        this.exitButton = this.shadow.querySelector('#exit-btn');
        this.logic();
    };

    toggleDropdown() {
        this.dropDownVisible = !this.dropDownVisible;
        if (this.dropDownVisible) {
            this.dropdown.classList.add("open");
        } else {
            this.dropdown.classList.remove("open");
        };
    };
    
    logic() {
        document.addEventListener("click", (e) => {
        const path = e.composedPath();
        if (!path.includes(this) && !path.includes(this.menuBtn)) {
            this.dropdown.classList.remove("open");
            this.dropDownVisible = false;
            }
        });
        this.menuBtn.addEventListener('click', (e) => {
            this.toggleDropdown();
        });
        this.exitButton.addEventListener('click', () => {
            ipcRenderer.invoke("exitProgramm");
        });
        //this.button.addEventListener('click', async () => {
            //let data = await ipcRenderer.invoke("getObsVersion");
            //this.h1Element.textContent = await data;
        //});
    };
};

customElements.define("menu-bar", MenuBar);