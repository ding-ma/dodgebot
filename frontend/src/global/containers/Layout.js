import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[700],
        },
    },
});

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
        <div className="layout">{children}</div>
    </ThemeProvider>
);

Layout.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

export default Layout;