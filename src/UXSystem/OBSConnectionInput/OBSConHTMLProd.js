const htmlOBSConnect = `<div class="obs-connect-box">
    <div class="obs-connect-box-content">
        <div class="obs-connect-header">
            <h3>Enter your Obs WebSocket Connect Data</h3>
        </div>
        <div class="obs-connect-input">
            <h4>OBS Server Adress</h4>
            <input id="obs-adress" type="text" placeholder="your Obs Local Adress">
            <h4>OBS Server Password</h4>
            <input id="obs-password" type="text" placeholder="your Obs Password">
            <div class="obs-connect-buttons">
                <button id="obs-ok-btn">OK</button>
                <button id="obs-cancel-btn">Cancel</button>
            </div>
        </div>
    </div>
</div>
<style>
    * {
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
    .obs-connect-box {
        display: flex;
        flex-direction: column;
        place-items: center;
    }
    .obs-connect-box-content {
        display: flex;
        flex-direction: column;
        place-items: center;
    }
    .obs-connect-input {
        display: flex;
        flex-direction: column;
        place-items: center;
        margin-top: 20px;
        gap: 5px;
    }
    .obs-connect-input input {
        margin-bottom: 10px;
        padding: 5px;
        border: 1px solid black;
        height: 25px;
    }

    .obs-connect-buttons {
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        gap: 20px;
    }

    .obs-connect-buttons button {
        width: 80px;
        height: 25px;
        background-color: gray;
        transition-property: background-color;
        transition-duration: 0.5s;
    }

    .obs-connect-buttons button:hover {
        background-color: rgb(160, 160, 160);
    }
</style>`

export {
    htmlOBSConnect,
}