class AlertDataHandler {
    constructor() {
        this.dataIsSet = false;
        this.alertObjList = [];
        this.rentObjList = [];
        this.subObjList = [];
    };

    setData(data) {
        this.alertObjList = data.alertObjList;
        this.rentObjList = data.rentObjList;
        this.subObjList = data.subObjList;
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

    showAllData() {
        const obj = {
            alertListData: this.alertObjList,
            rentListData: this.rentObjList,
            subListData: this.subObjList
        };
        console.log(obj);
    };
};

const AlertData = new AlertDataHandler();

export default AlertData;