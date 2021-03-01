import React, {createContext, useEffect, useState} from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentLeagAccount, setCurrentLeagAccoun] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(()=>{
        firebase.initializeApp({
            apiKey: "AIzaSyBXM-gu-99JxDtSMr02ZBBAUfDdWnI1vxk",
            authDomain: "dodge-bot.firebaseapp.com",
            databaseURL: "https://dodge-bot.firebaseio.com",
            projectId: "dodge-bot",
            storageBucket: "dodge-bot.appspot.com",
            messagingSenderId: "692707592061",
            appId: "1:692707592061:web:d72d5b9c419155cddfae14"
        });
    }, [])

    useEffect(() => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

        firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            if (currentUser) {
                try {

                    const userProfile = await firebase
                        .firestore()
                        .collection(currentUser.uid)
                        .doc('profile')
                        .get();

                    if (userProfile.exists) {
                        setCurrentUser(userProfile.data());
                    } else {
                        setCurrentUser(null);
                    }

                } catch (err) {
                    console.log(err);
                }
            }
        };
        getUserInfo();
    }, [currentUser])
    if(pending){
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