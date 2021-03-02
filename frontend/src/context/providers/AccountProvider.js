import React, {createContext, useEffect, useState} from "react";
import firebase from "firebase";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
            firebase.auth().onAuthStateChanged((user) => {
                setCurrentUser(user)
                setPending(false)
            });
        })
    }, []);

    if (pending) {
        return <div/>
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};