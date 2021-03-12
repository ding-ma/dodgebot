import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, InputLabel, MenuItem, Select, TextField, Typography} from '@material-ui/core';
import firebase from "firebase";
import {store} from 'react-notifications-component';

const NewPlayerForm = () => {
    const history = useHistory();

    const [summonerName, setSummonerName] = useState('')
    const [summonerError, setSummonerError] = useState(false)

    const [region, setRegion] = useState('North America');
    const regions = ['North America', 'Korea', 'Europe West', 'Europe East', 'Brazil'];

    const elos = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'GrandMaster', 'Challenger']
    const [elo, setElo] = useState('Silver')

    const tiers = ['I', 'II', 'III', 'IV']
    const [tier, setTier] = useState('I')

    const [errorMessage, setErrorMessage] = useState('');

    const handleRegisterAccount = async () => {
        if (summonerName === '' || region === '' || elo === '' || tier === '') {
            setErrorMessage('One of your fields is empty!')
            return
        }
        const {currentUser} = firebase.auth();
        const isPassword = currentUser.providerData[0].providerId === "password"

        const profile = {
            'elo': elo,
            'region': region,
            'summonerName': summonerName,
            'tier': tier
        }
        await firebase.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .set({'profile': profile,
                'predictions': [],
                'favorites':{
                    'top': [],
                    'jg': [],
                    'mid': [],
                    'adc': [],
                    'sup': []
                }
            })

        setSummonerError(false);
        if(isPassword){
            await currentUser.sendEmailVerification();
            store.addNotification({
                title: "Welcome Summoner!",
                message: "Please click on link in your email to confirm it",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000
                }
            });
        } else {
            store.addNotification({
                title: "Welcome Summoner!",
                message: " ",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000
                }
            });
        }

        history.push('/dashboard');
    }

    return (
        <form className="login-form">
            {errorMessage && (
                <Typography className="login-form__error" color="error">
                    {errorMessage}
                </Typography>
            )}

            <InputLabel htmlFor="">Region</InputLabel>
            <Select
                required={true}
                value={region}
                onChange={(event) => setRegion(event.target.value)}
                style={{ margin: '10px 0', width: '70%' }}
                variant="outlined"
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
                style={{ margin: '10px 0', width: '70%' }}
                variant="outlined"
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
                style={{ margin: '10px 0', width: '70%' }}
                variant="outlined"
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
                className="login-form__input"
                variant="outlined"
                color="primary"
                error={summonerError}
            />

            <InputLabel htmlFor=""/>
            <Button
                variant="contained"
                color="primary"
                className="login-form__button"
                onClick={() => handleRegisterAccount()}
            >
                Register
            </Button>
        </form>
    );
};

export default NewPlayerForm;