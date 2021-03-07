import React, {useContext, useEffect, useState} from 'react';
import firebase from "firebase";
import {AuthContext} from "../../../context/providers/AccountProvider";
import {store} from 'react-notifications-component';
import MatchCard from "../components/MatchCard";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    root: {
        minWidth: 800,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
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

    const {currentUser} = useContext(AuthContext);
    const [leagueAccount, setLeagueAccount] = useState({})
    const [matchHistory, setMatchesHistory] = useState([]);

    useEffect(() => {
        const getUserAccount = async () => {
            const data = await firebase.firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get()
            const {profile} = data.data() || {}
            const {predictions} = data.data() || []
            setLeagueAccount(profile)
            setMatchesHistory(predictions)
        }
        getUserAccount()
    }, [currentUser])

    if(matchHistory.length ===0 ){
        const notice = localStorage.getItem("notified")
        if (notice !== "yes"){
            store.addNotification({
                title: "Welcome Summoner!",
                message: "Select your favorite champions and start making predictions!",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000
                }
            });
            localStorage.setItem("notified", "yes")
        }

    }

    const renderBans = (bans) => {
        return (
            <div>
                <li>ban1: {bans.ban1}</li>
                <li>ban2: {bans.ban2}</li>
                <li>ban3: {bans.ban3}</li>
                <li>ban4: {bans.ban4}</li>
                <li>ban5: {bans.ban5}</li>
            </div>
        )
    }

    const renderPicks = (picks) => {
        return (
            <div>
                <li>Top: {picks.top}</li>
                <li>Jungle: {picks.jg}</li>
                <li>Mid: {picks.mid}</li>
                <li>Adc: {picks.adc}</li>
                <li>Support: {picks.sup}</li>
            </div>
        )
    }


    const renderMatches = () => {
        return matchHistory.map((match) => {
            return (
                <div>
                    <ul>
                        <h3>{new Date(match.date.seconds * 1000).toDateString()}</h3>
                        <h4>Elo: {match.elo}</h4>
                        BlueTeam Bans:
                        <ul>
                            {renderBans(match.blueTeam.bans)}
                        </ul>

                        BlueTeam Picks:
                        <ul>
                            {renderPicks(match.blueTeam.roles)}
                        </ul>

                        <br/>
                        RedTeam Bans:
                        <ul>
                            {renderBans(match.redTeam.bans)}
                        </ul>
                        RedTeam Picks:
                        <ul>
                            {renderPicks(match.redTeam.roles)}
                        </ul>
                    </ul>
                </div>
            )
        })
    }




    return (
        <div className="login">

            <Card className={classes.root} style={{background: '#a6c0ef'}} variant="outlined">
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

            <h2>Past Matches</h2>
            {matchHistory.length !== 0  && renderMatches()}
            {matchHistory.length === 0 && <div>No history!</div>}
            <MatchCard/>

        </div>
    );
}

export default Dashboard;

