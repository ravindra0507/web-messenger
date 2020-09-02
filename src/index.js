import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase';
import {Provider} from 'react-redux'
import store from './store';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABaWzeasGGwXBbizvV7DMp1XKB1jMLVgE",
  authDomain: "web-messenger-8840.firebaseapp.com",
  databaseURL: "https://web-messenger-8840.firebaseio.com",
  projectId: "web-messenger-8840",
  storageBucket: "web-messenger-8840.appspot.com",
  messagingSenderId: "756831897737",
  appId: "1:756831897737:web:e6138267cd13e0027e5e58",
  measurementId: "G-Q80DWDE7GE"
};

firebase.initializeApp(firebaseConfig);
window.store=store;

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode></Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
