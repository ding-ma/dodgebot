import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, InputLabel, MenuItem, Select, TextField, Typography} from '@material-ui/core';


const NewPlayerForm = () => {

    const history = useHistory();

    const [summonerName, setSummonerName] = useState('')
    const [summonerError, setSummonerError] = useState(false)

    const [region, setRegion] = useState('');
    const regions = ['North America', 'Korea', 'Europe West', 'Europe East', 'Brazil'];

    const elos = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'GrandMaster', 'Challenger']
    const [elo, setElo] = useState('')


    const tiers = ['I', 'II', 'III', 'IV']
    const [tier, setTier] = useState('')

    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterAccount = () => {
        if (summonerName === '' || region === '' || elo === '' || tier === '') {
            setErrorMessage('One of your fields is empty!')
            return
        }
        console.log(region, elo, tier, summonerName)
    }

    return (
        <form className="register-form">
            {errorMessage && (
                <Typography className="" color="error">
                    {errorMessage}
                </Typography>
            )}


            <InputLabel htmlFor="">Region</InputLabel>
            <Select
                required={true}
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                inputProps={{
                    name: "Region",
                    id: "age-simple"
                }}
            >
                {regions.map((value, index) => {
                    return <MenuItem key={index} value={value}>{value}</MenuItem>;
                })}
            </Select>

            <InputLabel htmlFor="">Elo</InputLabel>
            <Select
                required={true}
                value={elo}
                onChange={(event) => setElo(event.target.value)}
                inputProps={{
                    name: "Elo",
                    id: "age-simple"
                }}
            >
                {elos.map((value, index) => {
                    return <MenuItem key={index} value={value}>{value}</MenuItem>;
                })}
            </Select>

            <InputLabel htmlFor="">Tier</InputLabel>
            <Select
                required={true}
                value={tier}
                onChange={(event) => setTier(event.target.value)}
                inputProps={{
                    name: "Tier",
                    id: "age-simple"
                }}
            >
                {tiers.map((value, index) => {
                    return <MenuItem key={index} value={value}>{value}</MenuItem>;
                })}
            </Select>

            <InputLabel htmlFor="">Summoner Name</InputLabel>
            <TextField
                required={true}
                value={summonerName}
                onChange={(e) => setSummonerName(e.currentTarget.value)}
                className=""
                variant="outlined"
                color="primary"
                error={summonerError}
            />

            <InputLabel htmlFor=""/>
            <Button
                variant="contained"
                color="primary"
                className=""
                onClick={() => handleRegisterAccount()}
            >
                Register
            </Button>
        </form>
    );
};

export default NewPlayerForm;