import React, {useContext, useEffect, useState} from 'react';
import {Redirect, Route} from 'react-router-dom';
import firebase from "firebase";
import {AuthContext} from "../../context/providers/AccountProvider"

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser, currentLeagAccount} = useContext(AuthContext);
    console.log("in private route current user", currentUser);
    console.log("in private route league account", currentLeagAccount)
    const [state, setState] = useState('loading');

    useEffect(() => {
        (async function() {
            try {
                /* Update effect logic to track correct state */
                const isUserLogged = await firebase.auth().currentUser;
                setState(isUserLogged ? 'loggedin' : 'redirect');
            }
            catch {
                setState('redirect');
            }
        })();
    }, []);

    if(state === 'loading') {
        return <div>Loading..</div>
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