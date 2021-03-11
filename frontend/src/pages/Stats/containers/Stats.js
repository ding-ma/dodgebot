import React, {useEffect, useState} from 'react';
import {MenuItem, Select} from "@material-ui/core";
import firebase from "firebase";
import BarGraph from "../components/BarGraphs";
import PieGraph from "../components/PieGraph";

export default function Stats() {
    const elos = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
    const [elo, setElo] = useState('Silver')
    const [matchStats, setMatchStats] = useState({})

    useEffect(()=>{
        const getMatchHistory = async () =>{
            const data = await firebase.firestore()
                .collection('statistics')
                .doc(elo)
                .get()
            setMatchStats(data.data())
        }
        getMatchHistory()
    }, [elo])

    if ( Object.keys(matchStats).length === 0){
        return <div>Loading...</div>
    }

    return <div className="login-form">
        <Select
            required={true}
            value={elo}
            onChange={(event) => setElo(event.target.value)}
            style={{ margin: '10px 0', width: '70%' }}
            variant="outlined"
        >
            {elos.map((value, index) => {
                return <MenuItem key={index} value={value}>{value}</MenuItem>;
            })}
        </Select>

        <BarGraph data={matchStats.blueBans}/>
        <BarGraph data={matchStats.mostPopularAdc}/>
        <PieGraph data={matchStats.redWin}/>
        <PieGraph data={matchStats.redWinBans}/>

    </div>;
}
