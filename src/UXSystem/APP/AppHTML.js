const AppHTML = `<div class="app-box">
    <div class="app-box-content">
        <div class="app-menu-bar"></div>
        <button id="connect-to-obs">Connect To Obs</button>
        <div class="app-main-content">
        </div>
    </div>
    <style>
        .app-box {
            min-width: 100vw;
            min-height: 100vh;
            background-color: rgb(131, 131, 131);
        }

        .obs-connection-input-window {
            visibility: hidden;
            opacity: 0;
            position: absolute;
            display: flex;
            flex-direction: column;
            background-color: orange;
            box-shadow: 2px 2px 5px black;
            border-radius: 10px;
            padding: 10px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid black;
            transition-property: opacity;
            transition-duration: 0.5s;
        }
        .obs-connection-input-window.open {
            visibility: visible;
            opacity: 1;
        }
        .obs-connection-input-window:not(.open) {
            transition-delay: 0s, 0.5s;
            transition-property: opacity, visibility;
            transition-duration: 0.5s, 0s;
        }
    </style>
</div>`

export {
    AppHTML,
}