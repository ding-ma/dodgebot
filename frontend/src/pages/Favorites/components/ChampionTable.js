import React, {useContext, useEffect, useState} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {KeyToChamp} from "../../../constants/KeyToChampion";
import {ChampToKey} from "../../../constants/ChampToKey";
import {Button} from "@material-ui/core";
import firebase from "firebase";
import {AuthContext} from "../../../context/providers/AccountProvider";
import {store} from 'react-notifications-component';
import "../styles/table.scss"

const columns = [
    {field: 'champion', headerName: 'Champion Name', width: 200},
    {field: 'role', headerName: 'Role', width: 130},
];

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const displayRoleToDb = {
    "Top Lane": "top",
    "Jungle": "jg",
    "Mid Lane": "mid",
    "Bot Lane": "adc",
    "Support": "sup"
}

let counter = 1;

export default function ChampionTable({favoriteChampions}) {

    const {currentUser} = useContext(AuthContext);
    const [selectedItems, setSelectedItems] = useState([])
    const [data, setData] = useState([])
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
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < selected.length; j++) {
                if (data[i].id === parseInt(selected[j])) {
                    tmp.push(data[i])
                }
            }
        }
        setSelectedItems(tmp)
    }

    const handleDelete = async () => {
        console.log(selectedItems)
        if(selectedItems.length === 0){
            store.addNotification({
                title: "You haven't selected anything!",
                message: "Nothing was deleted",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                    duration: 5000
                }
            });
            return;
        }


        const championsToDelete = selectedItems.map(e => {
            return {"champion": ChampToKey[e.champion], "role": displayRoleToDb[e.role]}
        })

        let deleted = {}
        for (let key in favoriteChampions) {
            if (favoriteChampions.hasOwnProperty(key)) {
                for (let i in championsToDelete) {
                    if (championsToDelete[i].role === key) {
                        deleted[key] = favoriteChampions[key].filter(e => {
                            return e !== championsToDelete[i].champion
                        })
                    }
                }
            }
        }
        const newFavorites = Object.assign({}, favoriteChampions, deleted)

        const {jg, top, adc, sup, mid} = newFavorites

        await firebase.firestore()
            .collection('users')
            .doc(currentUser.uid)
            .update({'favorites': newFavorites})

        setData([
            ...flatten(top, 'Top Lane'),
            ...flatten(jg, 'Jungle'),
            ...flatten(adc, 'Bot Lane'),
            ...flatten(mid, 'Mid Lane'),
            ...flatten(sup, 'Support'),
        ])

        store.addNotification({
            title: "Champion Deleted!",
            message: " ",
            type: "danger",
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

                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    checkboxSelection={true}
                    onSelectionModelChange={e => selectItems(e.selectionModel)}
                />


            <Button
                variant="contained"
                color="primary"
                className="login-form__smallButton"
                onClick={() => handleDelete()}
            >
                Delete Selected
            </Button>
        </div>
    );
}
