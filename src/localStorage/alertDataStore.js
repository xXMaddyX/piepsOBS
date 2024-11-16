class AlertDataHandler {
    constructor() {
        this.dataIsSet = false;
        this.alertObjList = [];
        this.rentObjList = [];
        this.subObjList = [];
        this.chatObjList = [];
    };

    setData(data) {
        this.alertObjList = data.alertObjList;
        this.rentObjList = data.rentObjList;
        this.subObjList = data.subObjList;
        this.chatObjList = data.chatObjList;
        this.dataIsSet = true;
    };

    getAlertList() {
        return this.alertObjList;
    };

    getRentList() {
        return this.rentObjList;
    };

    getSubList() {
        return this.subObjList;
    };

    getChatList() {
        return this.chatObjList;
    }

    showAllData() {
        const obj = {
            alertListData: this.alertObjList,
            rentListData: this.rentObjList,
            subListData: this.subObjList,
            chatListData: this.chatObjList,
        };
        console.log(obj);
    };
};

const AlertData = new AlertDataHandler();

export default AlertData;