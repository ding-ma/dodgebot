import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useGlobalContext} from '../../context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { account } = useGlobalContext();
    console.log("in private route", account);

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!account.currentAccount) {
                    return <Redirect to="/" />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;