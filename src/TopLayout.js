import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './assets/theme/main';
import { rootReducer, rootSaga } from './store';
import storeProvider from './storeProvider';

export const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const { AppProvider } = storeProvider(rootReducer, rootSaga);

export default function TopLayout(props) {
  return (
    <AppProvider>
      <Helmet>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </AppProvider>
  );
}

TopLayout.propTypes = {
  children: PropTypes.node,
};