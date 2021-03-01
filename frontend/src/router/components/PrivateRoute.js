import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
// import {useGlobalContext} from '../../context';
import {AuthContext} from "../../context/providers/AccountProvider"

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(AuthContext);
    console.log("in private route", currentUser);

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