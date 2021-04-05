import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { Button, InputLabel, MenuItem, Typography } from "@material-ui/core";
import { AuthContext } from "../../../context/providers/AccountProvider";
import { useHistory } from "react-router-dom";
import { store } from "react-notifications-component";
import TextField from "../../MaterialUIOverwrite/TextField";
import endpoints from "../../../api/endpoints";

const SettingForm = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const isPassword = currentUser.providerData[0]?.providerId === "password";
  const [summonerName, setSummonerName] = useState("");
  const [password, setPassword] = useState("");

  const [region, setRegion] = useState("North America (NA1)");
  const regions = [
    "Brazil (BR1)",
    "Europe Nordic (EUN1)",
    "Europe West (EUW1)",
    "Latin America North (LA1)",
    "Latin America South (LA2)",
    "North America (NA1)",
    "Oceania (OCE)",
    "Russia (RU1)",
    "Turkey (TR1)",
    "Japan (JP1)",
    "Korea (KR)",
  ];

  const elos = [
    "Unranked",
    "Iron",
    "Bronze",
    "Silver",
    "Gold",
    "Platinum",
    "Diamond",
    "Master",
    "GrandMaster",
    "Challenger",
  ];
  const [elo, setElo] = useState("Silver");

  const tiers = ["I", "II", "III", "IV"];
  const [tier, setTier] = useState("I");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getUserAccount = async () => {
      const data = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
      const { profile } = data.data();
      const { elo, region, summonerName, tier } = profile;
      setElo(elo);
      setRegion(region);
      setSummonerName(summonerName);
      setTier(tier);
    };
    getUserAccount();
  }, [currentUser]);

  const submitUpdate = async () => {
    if (password !== "") {
      await firebase
        .auth()
        .currentUser.updatePassword(password)
        .then(() => {
          store.addNotification({
            title: "Successfully updated your password!",
            message: "  ",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
            },
          });
        })
        .catch((err) => {
          setErrorMessage(err);
        });
    }

    await firebase
      .firestore()
      .collection("users")
      .doc(currentUser.uid)
      .update({
        profile: {
          elo: elo,
          region: region,
          summonerName: summonerName,
          tier: tier,
        },
      });
    store.addNotification({
      title: "Changes saved!",
      message: "  ",
      type: "success",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
    history.push(endpoints.uri.history);
  };

  return (
    <form className="login-form">
      <Typography className="login-form__error" color="error">
        {errorMessage}
      </Typography>

      <InputLabel className="label-color">Email</InputLabel>
      <TextField
        disabled
        required={true}
        value={currentUser.email}
        className="login-form__input"
        variant="outlined"
        color="primary"
      />

      <InputLabel className="label-color">Summoner Name</InputLabel>
      <TextField
        disabled
        required={true}
        value={summonerName}
        className="login-form__input"
        variant="outlined"
        color="primary"
      />

      <InputLabel className="label-color">Region</InputLabel>
      <TextField
        disabled
        required={true}
        value={region}
        onChange={(event) => setRegion(event.target.value)}
        style={{ margin: "10px 0", width: "70%" }}
        variant="outlined"
        select
      >
        {regions.map((value, index) => {
          return (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </TextField>

      <InputLabel className="label-color">Change Password</InputLabel>
      {isPassword && (
        <TextField
          required={true}
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
          className="login-form__input"
          variant="outlined"
          color="primary"
          helperText="New password must be at least 8 characters long"
        />
      )}

      {!isPassword && (
        <TextField
          disabled
          required={true}
          value="Your are using OAuth!"
          className="login-form__input"
          variant="outlined"
          color="primary"
        />
      )}

      <InputLabel className="label-color">Elo</InputLabel>
      <TextField
        required={true}
        value={elo}
        onChange={(event) => setElo(event.target.value)}
        style={{ margin: "10px 0", width: "70%" }}
        variant="outlined"
        select
      >
        {elos.map((value, index) => {
          return (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </TextField>

      <InputLabel className="label-color">Tier</InputLabel>
      <TextField
        required={true}
        value={tier}
        onChange={(event) => setTier(event.target.value)}
        style={{ margin: "10px 0", width: "70%" }}
        variant="outlined"
        select
      >
        {tiers.map((value, index) => {
          return (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </TextField>

      <InputLabel className="label-color" />
      <Button
        variant="contained"
        color="primary"
        className="login-form__button"
        onClick={() => submitUpdate()}
      >
        Update!
      </Button>

      <div className="login-footer">
        <Typography color="inherit" className="login-footer__text">
          <b>Note:</b> to change a disabled field, please{" "}
          <a href={"mailto:contact@dodgebot.tech"}>email</a> us!
        </Typography>
      </div>
    </form>
  );
};
export default SettingForm;
