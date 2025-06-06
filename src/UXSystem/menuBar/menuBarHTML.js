const menuBarHTML = `<div class="menu-bar-box">
    <div class="menu-bar-box-content">
        <button id="menu-button">Menu</button>
        <h3>Piep´s Rumble OBS Connector</h3>
        <div class="button-dropdown">
            <button id="save-conf-btn">Save Settings</button>
            <button id="obs-connect-btn">Set OBS Connection</button>
            <button id="rumble-connect-btn">Set Rumble Connection</button>
            <button id="exit-btn">Exit</button>
        </div>
        <div></div>
    </div>
</div>
<style>
    body {
        padding: 0px;
        margin: 0px;
        box-sizing: border-box;
    }
    .menu-bar-box {
        display: flex;
        flex-direction: column;
        width: 100vw;
        max-height: fit-content;
        justify-content: center;
        background-color: orange;
        border-bottom: 1px solid black;
    }
    .menu-bar-box-content {
        display: flex;
        flex-direction: row;
        max-height: 30px;
        gap: 300px;
        justify-content: space-between;
    }
    .menu-bar-box-content h3{
        flex: none;
        align-self: center;
    }
    #menu-button {
        background-color: rgb(77, 77, 77);
        min-width: 80px;
        height: 30px;
        place-self: center;
        font-size: 1rem;
        font-weight: 800;
        text-shadow: 0px 0px 10px gray;
        transition-property: background-color;
        transition-duration: .5s;
    }
    #menu-button:hover {
        background-color: rgb(160, 160, 160);
    }
    .button-dropdown {
        padding: 5px;
        background-color: orange;
        border: 1px solid black;
        position: absolute;
        visibility: hidden;
        opacity: 0;
        display: flex;
        flex-direction: column;
        top: 30px;
        gap: 5px;
        transition-property: opacity;
        transition-duration: 0.5s;
    }

    .button-dropdown button {
        background-color: gray;
        transition-property: background-color;
        transition-duration: .5s;
    }

    .button-dropdown button:hover {
        background-color: rgb(160, 160, 160);
    }

    .button-dropdown.open {
        opacity: 1;
        visibility: visible;
    }

    .button-dropdown:not(.open) {
    transition-delay: 0s, 0.5s;
    transition-property: opacity, visibility;
    transition-duration: 0.5s, 0s;
    }
</style>`

export {
    menuBarHTML,
}