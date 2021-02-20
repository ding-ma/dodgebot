import React, {createContext, useContext, useEffect, useState} from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

const AccountContext = createContext(null);

export const AccountContextProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentAccount);
    }, []);

    useEffect(() => {
        const getUserInfo = async () => {
            if (currentAccount) {
                try {

                    const userProfile = await firebase
                        .firestore()
                        .collection(currentAccount.uid)
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
    }, [currentAccount]);

    return (
        <AccountContext.Provider value={{currentAccount, currentUser}}>
            {children}
        </AccountContext.Provider>
    );
};

AccountContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAccountContext = () => useContext(AccountContext);