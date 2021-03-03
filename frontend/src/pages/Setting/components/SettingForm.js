import React, {useContext, useEffect, useState} from 'react';
import firebase from 'firebase';
import {Button, InputLabel, MenuItem, Select, TextField, Typography} from '@material-ui/core';
import {AuthContext} from "../../../context/providers/AccountProvider";
import {useHistory} from "react-router-dom";
import {store} from 'react-notifications-component';

const SettingForm = () => {
        const history = useHistory()
        const {currentUser} = useContext(AuthContext);

        const isPassword = currentUser.providerData[0].providerId === "password"
        const [summonerName, setSummonerName] = useState('')
        const [password, setPassword] = useState('')

        const [region, setRegion] = useState('North America');
        const regions = ['North America', 'Korea', 'Europe West', 'Europe East', 'Brazil'];

        const elos = ['Unranked', 'Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'GrandMaster', 'Challenger']
        const [elo, setElo] = useState('Silver')

        const tiers = ['I', 'II', 'III', 'IV']
        const [tier, setTier] = useState('I')
        const [errorMessage, setErrorMessage] = useState('');


        useEffect(() => {
            const getUserAccount = async () => {
                const data = await firebase.firestore()
                    .collection('users')
                    .doc(currentUser.uid)
                    .get()
                const {profile} = data.data()
                const {elo, region, summonerName, tier} = profile
                setElo(elo)
                setRegion(region)
                setSummonerName(summonerName)
                setTier(tier)
            }
            getUserAccount()
        }, [currentUser])


        const submitUpdate = async () => {
            if (password !== '') {
                await firebase.auth().currentUser.updatePassword(password)
                    .then(() => {
                        console.log("success")
                    }).catch((err) => {
                            setErrorMessage(err);
                        }
                    );
            }

            await firebase.firestore()
                .collection('users')
                .doc(currentUser.uid)
                .update({
                    'profile': {
                        'elo': elo,
                        'region': region,
                        'summonerName': summonerName,
                        'tier': tier
                    }
                })
            store.addNotification({
                title: "Changes saved!",
                message: '  ',
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000
                }
            });
            history.push("/dashboard")
        }

        return (
            <form className="login-form">
                <Typography className="login-form__error" color="error">
                    {errorMessage}
                </Typography>

                <InputLabel htmlFor="">Email</InputLabel>
                <TextField
                    disabled
                    required={true}
                    value={currentUser.email}
                    className="login-form__input"
                    variant="outlined"
                    color="primary"
                />

                <InputLabel htmlFor="">Summoner Name</InputLabel>
                <TextField
                    disabled
                    required={true}
                    value={summonerName}
                    className="login-form__input"
                    variant="outlined"
                    color="primary"
                />

                <InputLabel htmlFor="">Change Password</InputLabel>
                {isPassword &&
                <TextField
                    required={true}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="login-form__input"
                    variant="outlined"
                    color="primary"
                />
                }

                {!isPassword &&
                <TextField
                    disabled
                    required={true}
                    value="Your are using OAuth!"
                    className="login-form__input"
                    variant="outlined"
                    color="primary"
                />
                }


                <InputLabel htmlFor="">Region</InputLabel>
                <Select
                    disabled
                    required={true}
                    value={region}
                    onChange={(event) => setRegion(event.target.value)}
                    style={{margin: '10px 0', width: '70%'}}
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
                    style={{margin: '10px 0', width: '70%'}}
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
                    style={{margin: '10px 0', width: '70%'}}
                    variant="outlined"
                >
                    {tiers.map((value, index) => {
                        return <MenuItem key={index} value={value}>{value}</MenuItem>;
                    })}
                </Select>


                <InputLabel htmlFor=""/>
                <Button
                    variant="contained"
                    color="primary"
                    className="login-form__button"
                    onClick={() => submitUpdate()}
                >
                    Update!
                </Button>

                <div className="login-footer">
                    <Typography color="inherit" className="login-footer__text">
                        <b>Note:</b> to change a disabled field, please email a moderator!
                    </Typography>
                </div>
            </form>
        );
    }
;

export default SettingForm;