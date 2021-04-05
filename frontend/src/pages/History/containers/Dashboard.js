import React, { useContext, useEffect, useState } from "react";
import firebase from "firebase";
import { AuthContext } from "../../../context/providers/AccountProvider";
import MatchCard from "../components/MatchCard";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import StartPredict from "../components/StartPredict";

const useStyles = makeStyles({
  root: {
    minWidth: 800,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const { currentUser } = useContext(AuthContext);
  const [leagueAccount, setLeagueAccount] = useState({});
  const [matchHistory, setMatchesHistory] = useState([]);

  const eloToColor = {
    Unranked: "#f9e8db",
    Iron: "#8d8c89",
    Bronze: "#af8a6b",
    Silver: "#a7bac0",
    Gold: "#f7dd72",
    Platinum: "#a5c7c6",
    Diamond: "#82acc4",
    Master: "#d2a1e3",
    GrandMaster: "#fb6665",
    Challenger: "#67fafe",
  };

  useEffect(() => {
    const getUserAccount = async () => {
      const data = await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get();
      const { profile } = data.data() || {};
      const { predictions } = data.data() || [];
      setLeagueAccount(profile);

      const sortedPredictions = predictions.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });

      setMatchesHistory(sortedPredictions);
    };
    getUserAccount();
  }, [currentUser]);

  const renderHistory = () => {
    if (matchHistory.length > 0) {
      return (
        <div>
          <h2>Past Matches</h2>
          {matchHistory.map((e) => {
            return <MatchCard data={e} key={e.date} />;
          })}
        </div>
      );
    } else {
      return (
        <div>
          <h2>No Matches Found</h2>
          <StartPredict />
        </div>
      );
    }
  };

  return (
    <div className="dashboard">
      <Card
        className={classes.root}
        style={{ background: eloToColor[leagueAccount.elo] }}
        variant="outlined"
      >
        <CardContent>
          <Typography variant="body1" component="p">
            {leagueAccount.region}
          </Typography>

          <Typography variant="h3" component="p">
            {leagueAccount.summonerName}
          </Typography>

          <Typography variant="body1" component="p">
            {leagueAccount.elo} {bull} <b>{leagueAccount.tier}</b>
          </Typography>
        </CardContent>
      </Card>

      {renderHistory()}
    </div>
  );
};

export default Dashboard;
