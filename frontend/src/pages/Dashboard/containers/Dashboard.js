import React, {useEffect, useState} from 'react';
import {useGlobalContext} from "../../../context";
import {useHistory} from "react-router-dom";
import NavBar from "../components/NavBar"
import firebase from "firebase";

const Dashboard = () => {
    //TODO: change account-example to account.currentAccount['uid'] after

    const {account} = useGlobalContext();
    const history = useHistory();

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
            console.log(match)
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

    const fetchMatches = async () => {
        const matches = await firebase
            .firestore()
            .collection('account-example')
            .doc('predictions')
            .get();
        setMatchesHistory(matches.data()['predictions'])
        console.log(matchHistory)
    }

    const fetchFavChampions = async () => {
        const champ = await firebase
            .firestore()
            .collection('account-example')
            .doc('favorites')
            .get()
        setFavChampions(champ.data())
    }

    useEffect(() => {
        fetchMatches();
        fetchFavChampions();
    }, [])

    return (
        <div>
            <NavBar/>
            <h1>Welcome <u>{account.currentUser['summonerName']}</u>!</h1>

            <ul>
                <li>Region: {account.currentUser['region']}</li>
                <li>Elo: {account.currentUser['elo']}</li>
                <li>Tier: {account.currentUser['tier']}</li>
            </ul>

            <h2>Past Matches</h2>
            {matchHistory !== [] && renderMatches()}


            <h2>Favorite Champions</h2>
            {JSON.stringify(favChampions, null, 2)}
            {Object.keys(favChampions).length > 0 && renderFavChampions()}

            <h2>Settings</h2>
            {JSON.stringify(account.currentUser, null, 2)}

        </div>
    );
}

export default Dashboard;

