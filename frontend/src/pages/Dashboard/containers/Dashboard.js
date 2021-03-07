import React, {useContext, useEffect, useState} from 'react';
import firebase from "firebase";
import {AuthContext} from "../../../context/providers/AccountProvider";
import {store} from 'react-notifications-component';
import MatchCard from "../components/MatchCard";


const Dashboard = () => {
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

            <h1>Welcome <u>{leagueAccount.summonerName}</u>!</h1>

            <ul>
                <li>Region: {leagueAccount.region}</li>
                <li>Elo: {leagueAccount.elo}</li>
                <li>Tier: {leagueAccount.tier}</li>
            </ul>

            <h2>Past Matches</h2>
            {matchHistory.length !== 0  && renderMatches()}
            {matchHistory.length === 0 && <div>No history!</div>}
            <MatchCard/>

        </div>
    );
}

export default Dashboard;

