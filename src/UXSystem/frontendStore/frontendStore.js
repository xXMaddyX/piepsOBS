class FrontendStore {
    constructor() {
        this.obsDataStore = {};
    };

    setObsDataStore(obsData) {
        this.obsDataStore = obsData;
    };

    getObsDataStore() {
        return this.obsDataStore;
    };
}

export const FrontendStoreGlobal =  new FrontendStore();