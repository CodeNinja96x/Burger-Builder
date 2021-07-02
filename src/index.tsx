// These must be the first lines in src/index.js
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import './customPolyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import * as serviceWorker from './serviceWorker';

import axios from 'axios'
import { msalInstance } from './msalConfig';
import { MsalProvider } from '@azure/msal-react';
axios.defaults.headers.put["Content-Type"] = "application/json";

/* Basic authentication used in local development mode.
   Add the .env file to root with the following content and define user and passowrd. Do not commit '.env'.
 
  REACT_APP_USER=admin
  REACT_APP_PASSWORD=Temp_1234
if (process.env.NODE_ENV === 'development') {
  axios.defaults.auth = {
    username: process.env.REACT_APP_USER as string,
    password: process.env.REACT_APP_PASSWORD as string
  }
}
*/

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <App  isLocalDev={process.env.NODE_ENV === 'development'} />
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
