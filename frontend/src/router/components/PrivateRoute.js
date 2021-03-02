import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import firebase from "firebase";
import {AuthContext} from "../../context/providers/AccountProvider"

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log("in private route current user", currentUser);
    const [state, setState] = useState('loading');

    useEffect(() => {
        (async function() {
            try {
                const isUserLogged = await firebase.auth().currentUser;
                setState(isUserLogged ? 'loggedin' : 'redirect');
            }
            catch {
                setState('redirect');
            }
        })();
    }, []);

    if(state === 'loading') {
        return <div/>
    }

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return <Redirect to="/"/>;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;