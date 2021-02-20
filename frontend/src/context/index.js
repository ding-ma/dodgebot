import React from 'react';
import PropTypes from 'prop-types';

import {AccountContextProvider, useAccountContext,} from './providers/AccountProvider';

export const GlobalContextProvider = ({ children}) => (
    <AccountContextProvider>{children}</AccountContextProvider>
);

GlobalContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useGlobalContext = () => ({
    account: useAccountContext(),
});

export const useGlobalDispatch = () => ({});