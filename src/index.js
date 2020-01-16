import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './store/reducers/rootReducer';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import fbConfig from './config/fbConfig';
import firebase from 'firebase/app';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 
import 'typeface-roboto';


const theme = createMuiTheme({
  palette: {
     primary: {
        light: '#fff',
        main: 'rgb(23, 105, 170)',
        dark: '#000'
     },
     secondary: {
       main: '#006A8E',
     },
  },
  typography: { 
    fontFamily: 'typeface-roboto'
  }
});

const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
      reduxFirestore(firebase, fbConfig)
    )
  );
  
  
  const rrfProps = {
    firebase,
    config: fbConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
  };
  
  
  ReactDOM.render(
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
      <MuiThemeProvider theme={theme}><App /></MuiThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById("root")
  );



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
