import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../context/providers/AccountProvider";
import firebase from "firebase";
import Champions from "../components/Champions";

const Favorites = () => {
    const {currentUser} = useContext(AuthContext);

    const [favChampions, setFavChampions] = useState({});
    useEffect(() => {
        const getUserAccount = async () => {
            const data = await firebase.firestore()
                .collection('users')
                .doc(currentUser.uid)
                .get()
            const {favorites} = data.data()
            setFavChampions(favorites)
        }
        getUserAccount()
    }, [currentUser])

    return (
        <div>
            <h2> Here are your favorite champions</h2>
            <Champions champs={favChampions}/>
        </div>
    )
}

export default Favorites;