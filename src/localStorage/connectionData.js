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
    //API DATA------------------>
    rumbleStartAPIData: null,
    rumbleCurrentAPIData: null,
    
    //FOLLOWER_ALERT_NUMBERS----------->
    currentFollowersNums: null,
    newFollowersNums: null,
    lastFollowerName: null,

    //CHAT_DATA------------------------>
    currentChat: null,
    newChat: null,

    currentViewsers: null,
};

export {
    localStore,
    rumbleAPIData
};