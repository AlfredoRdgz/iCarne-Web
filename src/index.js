// Created by Alfredo Rodriguez.
// <summary>
// Index file contains the initial implementation to run the application in the HTML file.
// </summary>
import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './style/App.css';
import App from './components/AppComponent';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import theme from './style/theme';
// Redux imports
import { Provider } from 'react-redux';
import { configureStore } from './redux/Store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate
      loading={<div>Loading...</div>}
      persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
