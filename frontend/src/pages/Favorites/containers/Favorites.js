import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/providers/AccountProvider";
import firebase from "firebase";
import ChampionTable from "../components/ChampionTable";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Button, MenuItem } from "@material-ui/core";
import { KeyToChamp } from "../../../constants/KeyToChampion";
import { ChampToKey } from "../../../constants/ChampToKey";
import { store } from "react-notifications-component";
import TextField from "../../MaterialUIOverwrite/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputLabel-outlined:not(.MuiInputLabel-shrink)": {
      transform: "translate(34px, 20px) scale(1);",
    },
    "& .MuiFormLabel-root": {
      color: "white !important",
    },
    "& .MuiSvgIcon-root": {
      color: "white !important",
    },
  },
  inputRoot: {
    color: "white",
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
      paddingLeft: 26,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c79b3b",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c79b3b",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#c79b3b",
    },
  },
}));

const displayRoleToDb = {
  "Top Lane": "top",
  Jungle: "jg",
  "Mid Lane": "mid",
  "Bot Lane": "adc",
  Support: "sup",
};

const Favorites = () => {
  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);
  const roles = ["Top Lane", "Jungle", "Mid Lane", "Bot Lane", "Support"];
  const [role, setRole] = useState("Top Lane");
  const champions = Object.values(KeyToChamp).filter((e) => {
    return e !== "None";
  });
  const [searchChampion, setSearchChampion] = useState("");
  const [favChampions, setFavChampions] = useState({});

  useEffect(() => {
    const getUserAccount = async () => {
      const data = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
      const { favorites } = data.data();
      setFavChampions(favorites);
    };
    getUserAccount();
  }, [currentUser]);

  const handleNewChampion = async () => {
    console.log(
      displayRoleToDb[role],
      ChampToKey[searchChampion],
      searchChampion
    );

    let toDb = { ...favChampions };
    toDb[displayRoleToDb[role]].push(ChampToKey[searchChampion]);
    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({ favorites: toDb });

    setFavChampions(toDb);

    store.addNotification({
      title: "Champion Added!",
      message: " ",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  };

  return (
    <div>
      <h2> Here are your favorite champions</h2>
      <Autocomplete
        id="combo-box-demo"
        options={champions}
        style={{ margin: "10px 0", width: "30%" }}
        renderInput={(params) => (
          <TextField {...params} label="Champions" variant="outlined" />
        )}
        onChange={(event, value) => setSearchChampion(value)}
        classes={classes}
      />
      <div className="row">
        <TextField
          required={true}
          value={role}
          onChange={(event) => setRole(event.target.value)}
          style={{ margin: "10px 0", width: "30%" }}
          variant="outlined"
          select
        >
          {roles.map((value, index) => {
            return (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            );
          })}
        </TextField>

        <div className="column">
          <Button
            variant="contained"
            color="primary"
            className="login-form__smallButton"
            onClick={() => handleNewChampion()}
          >
            Add!
          </Button>
        </div>
      </div>

      <ChampionTable favoriteChampions={favChampions} />
    </div>
  );
};

export default Favorites;
