const localStore = {
    obsConfig: {
        adress: "",
        password: ""
    },
    rumbleConfig: {
        url: ""
    },
};

const rumbleAPIData = {
    rumbleStartAPIData: null,
    rumbleCurrentAPIData: null,
    
    currentFollowersNums: null,
    newFollowersNums: null,

    lastFollowerName: null,
};

export {
    localStore,
    rumbleAPIData
};