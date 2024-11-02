class MenuBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        /**@type {HTMLTemplateElement} */
        const template = document.getElementById('menu-bar-template');
        const templateContent = template.content.cloneNode(true);
        this.shadowRoot.appendChild(templateContent);
    }
}

customElements.define("menu-bar", MenuBar);
