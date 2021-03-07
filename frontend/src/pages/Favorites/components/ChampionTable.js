import React, {useContext, useEffect, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {KeyToChamp} from "../../../constants/KeyToChampion";
import {ChampToKey} from "../../../constants/ChampToKey";
import {Button, MenuItem, Select, TextField} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import firebase from "firebase";
import {AuthContext} from "../../../context/providers/AccountProvider";
import {store} from 'react-notifications-component';

const columns = [
    {field: 'champion', headerName: 'Champion Name', width: 200},
    {field: 'role', headerName: 'Role', width: 130},
];

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

let counter = 1;

export default function ChampionTable({favoriteChampions}) {
    const {currentUser} = useContext(AuthContext);

    const [selectedItems, setSelectedItems] = useState([])
    const [data, setData] = useState([])
    const [searchChampion, setSearchChampion] = useState('')
    const [role, setRole] = useState('Top Lane')
    const roles = ['Top Lane', 'Jungle', 'Mid Lane', 'Bot Lane', 'Support'];
    const champions = Object.values(KeyToChamp).filter(e => {
        return e !== "None"
    })

    const flatten = (arr, name) => {
        let tmp = []
        for (let i = 0; i < arr.length; i++) {
            tmp.push({'id': counter, 'champion': KeyToChamp[arr[i]], 'role': name})
            counter++;
        }
        return tmp
    }

    useEffect(() => {
        if (favoriteChampions !== undefined && !isEmpty(favoriteChampions)) {
            const {jg, top, adc, sup, mid} = favoriteChampions
            setData([
                ...flatten(top, 'Top Lane'),
                ...flatten(jg, 'Jungle'),
                ...flatten(adc, 'Bot Lane'),
                ...flatten(mid, 'Mid Lane'),
                ...flatten(sup, 'Support'),
            ])
        }
    }, [favoriteChampions])


    const selectItems = (selected) => {
        let tmp = []
        for (let i = 0; i < selected.length; i++) {
            tmp.push(data[parseInt(selected[i]) - 1])
        }
        setSelectedItems(tmp)
    }

    const handleNewChampion = async () => {
        const displayRoleToDb = {
            "Top Lane": "top",
            "Jungle": "jg",
            "Mid Lane": "mid",
            "Bot Lane": "adc",
            "Support": "sup"
        }

        console.log(displayRoleToDb[role], ChampToKey[searchChampion], searchChampion)
        favoriteChampions[displayRoleToDb[role]].push(ChampToKey[searchChampion])
        await firebase.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .update({'favorites': favoriteChampions})
        setSearchChampion('')

        const {jg, top, adc, sup, mid} = favoriteChampions
        setData([
            ...flatten(top, 'Top Lane'),
            ...flatten(jg, 'Jungle'),
            ...flatten(adc, 'Bot Lane'),
            ...flatten(mid, 'Mid Lane'),
            ...flatten(sup, 'Support'),
        ])

        store.addNotification({
            title: "Champion Added!",
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


    return (
        <div style={{height: 400, width: 800}}>

            <Autocomplete
                id="combo-box-demo"
                options={champions}
                style={{margin: '10px 0', width: '30%'}}
                renderInput={(params) => <TextField {...params} label="Champions" variant="outlined"/>}
                onChange={(event, value) => setSearchChampion(value)}
            />
            <Select
                required={true}
                value={role}
                onChange={(event) => setRole(event.target.value)}
                style={{margin: '10px 0', width: '30%'}}
                variant="outlined"
            >
                {roles.map((value, index) => {
                    return <MenuItem key={index} value={value}>{value}</MenuItem>;
                })}
            </Select>

            <Button
                variant="contained"
                color="primary"
                onClick={() => handleNewChampion()}
            >
                Add!
            </Button>


            <DataGrid
                rows={data}
                columns={columns}
                pageSize={5}
                checkboxSelection={true}
                onSelectionModelChange={e => selectItems(e.selectionModel)}
            />
        </div>
    );
}
