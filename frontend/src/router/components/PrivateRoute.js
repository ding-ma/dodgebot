import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {useGlobalContext} from '../../context';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { account } = useGlobalContext();

    return (
        <Route
            {...rest}
            render={(props) => {
                if (!account.currentAccount) {
                    return <Redirect to="/login" />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default PrivateRoute;