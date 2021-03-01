import React, {createContext, useEffect, useState} from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentLeagAccount, setCurrentLeagAccount] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            firebase.auth().onAuthStateChanged((user) => {
                console.log('userchange', user)
                setCurrentUser(user)
                setPending(false)
            });
        })

    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            if (currentUser) {
                try {
                    console.log(currentUser)
                    const userProfile = await firebase
                        .firestore()
                        .collection(currentUser.uid)
                        .doc('profile')
                        .get();

                    if (userProfile.exists) {
                        setCurrentLeagAccount(userProfile.data());
                    } else {
                        setCurrentLeagAccount(null);
                    }

                } catch (err) {
                    console.log(err);
                }
            }
        };
        getUserInfo();
    }, [currentUser])

    if (pending) {
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser, currentLeagAccount
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};