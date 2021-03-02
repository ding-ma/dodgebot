import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import firebase from "firebase";
import {AuthContext} from "../../../context/providers/AccountProvider";

const Dashboard = () => {
    const {currentUser} = useContext(AuthContext);
    const history = useHistory();

    const [leagueAccount, setLeagueAccount] = useState({})
    const [matchHistory, setMatchesHistory] = useState([]);
    const [favChampions, setFavChampions] = useState({});

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

    const renderFavChampRole = (role) => {
        return role.map((r) => {
            return (
                <div>
                    <li>{r}</li>
                </div>
            )
        })
    }

    const renderFavChampions = () => {
        return <div>
            <ul>ADC: {renderFavChampRole(favChampions.adc)}</ul>
            <ul>Support: {renderFavChampRole(favChampions.sup)}</ul>
            <ul>Mid: {renderFavChampRole(favChampions.mid)}</ul>
            <ul>Jungle: {renderFavChampRole(favChampions.jg)}</ul>
            <ul>Top: {renderFavChampRole(favChampions.top)}</ul>
        </div>
    }

    useEffect(() => {
        const getUserAccount = async () => {
            const data = await firebase.firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get()
            const {favorites, predictions, profile} = data.data()
            setFavChampions(favorites)
            setLeagueAccount(profile)
            setMatchesHistory(predictions)
        }
        getUserAccount()
    }, [])

    return (
        <div>

            <h1>Welcome <u>{leagueAccount.summonerName}</u>!</h1>

            <ul>
                <li>Region: {leagueAccount.region}</li>
                <li>Elo: {leagueAccount.elo}</li>
                <li>Tier: {leagueAccount.tier}</li>
            </ul>

            <h2>Past Matches</h2>
            {/*{matchHistory !== [] && renderMatches()}*/}


            <h2>Favorite Champions</h2>
            {Object.keys(favChampions).length > 0 && renderFavChampions()}

            <h2>Settings</h2>

        </div>
    );
}

export default Dashboard;

