import './index.css';
import './UXSystem/menuBar/menubar.js';
import './loadTemplates.js'

const app = document.querySelector('#app');
const menuBar = document.createElement("menu-bar");

app.append(menuBar);