import React, {useEffect, useState} from 'react';
import {MenuItem} from "@material-ui/core";
import firebase from "firebase";
import BarGraph from "../components/BarGraphs";
import PieGraph from "../components/PieGraph";
import TextField from "../../MaterialUIOverwrite/TextField"

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

    return <div className="dashboard">
        <TextField
            required={true}
            value={elo}
            onChange={(event) => setElo(event.target.value)}
            style={{ margin: '10px 0', width: '70%' }}
            variant="outlined"
            select
        >
            {elos.map((value, index) => {
                return <MenuItem key={index} value={value}>{value}</MenuItem>;
            })}
        </TextField>

        <BarGraph data={matchStats.mostPopularTop}/>
        {/*<BarGraph data={matchStats.mostPopularJg}/>*/}
        {/*<BarGraph data={matchStats.mostPopularMid}/>*/}
        {/*<BarGraph data={matchStats.mostPopularAdc}/>*/}
        {/*<BarGraph data={matchStats.mostPopularSup}/>*/}

        {/*<BarGraph data={matchStats.redBans}/>*/}
        {/*<PieGraph data={matchStats.redWin}/>*/}
        {/*<PieGraph data={matchStats.redWinBans}/>*/}

        {/*WIP*/}
        {/*<BarGraph data={matchStats.yasuoGames}/>*/}


    </div>;
}
