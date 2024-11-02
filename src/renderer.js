import './index.css';
import MainApp from './UXSystem/APP/App.js';

//Define Custom Elements
customElements.define("main-app", MainApp);

//Add Elements after DOM Content Loaded
window.addEventListener("DOMContentLoaded", () => {
    const app = document.querySelector('#app');
    const mainApp = document.createElement("main-app");
    
    app.append(mainApp)
});