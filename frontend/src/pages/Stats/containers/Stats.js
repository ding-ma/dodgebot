import React, {useState} from 'react';
import {MenuItem, Select} from "@material-ui/core";
import StatsLoader from "../components/StatsLoader";

export default function Stats() {
    const elos = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond']
    const [elo, setElo] = useState('Silver')
    
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

        <StatsLoader elo={elo}/>

    </div>;
}
