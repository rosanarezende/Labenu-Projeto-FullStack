import React from 'react';
import { Provider } from 'react-redux'
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";

import { history, store } from "./store"
import Routes from './routes';
import theme from './utils/theme';

function App() {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes history={history} />
      </MuiThemeProvider>
    </Provider>
  );
}

export default App;
