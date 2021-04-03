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
    collect:
      "https://us-central1-ordinal-cacao-291815.cloudfunctions.net/collect-data",
    predict: "https://prediction-wvdj36m4qa-uc.a.run.app/predictWinner",
  },
};

export default endpoints;
