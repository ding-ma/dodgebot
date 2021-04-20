const endpoints = {
  uri: {
    home: "/",
    reset: "/reset",
    register: "/register",
    stats: "/stats",
    predict: "/predict",
    history: "/history",
    favorites: "/favorites",
    settings: "/settings",
    new: "/new",
    confirm: "/confirm",
  },
  api: {
    collect: process.env.REACT_APP_COLLECTION_URL || "",
    predict: process.env.REACT_APP_ML_URL || "",
  },
  firebase: {
    apiKey: process.env.REACT_APP_apiKey || "",
    authDomain: process.env.REACT_APP_authDomain || "",
    databaseURL: process.env.REACT_APP_databaseURL || "",
    projectId: process.env.REACT_APP_projectId || "",
    storageBucket: process.env.REACT_APP_storageBucket || "",
    messagingSenderId: process.env.REACT_APP_messagingSenderId || "",
    appId: process.env.REACT_APP_appId || "",
  },
};

export default endpoints;
