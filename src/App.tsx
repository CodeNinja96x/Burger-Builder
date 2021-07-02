import React, { useState, useEffect, useReducer } from 'react';
import { Container } from 'react-bootstrap';

import { AccountInfo, InteractionType } from "@azure/msal-browser";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { authRequest } from "./msalConfig";
import { ErrorComponent, LoadingComponent } from './components';

import { getCurrentUser, setAccessToken } from './api'
import { GlobalContext, InitialState, MainReducer, ACTIONS } from './state';

import './app.scss';
//import logo from './logo.png'; // Tell Webpack this JS file uses this image

import { ActivityOverlay, Header, Sidebar  } from './views';
import {
  // eslint-disable-next-line
  Switch,
  Route,
  HashRouter,
  Redirect,
} from "react-router-dom";
 
import { Dashboard, Admin, Examples } from './views';

function App({isLocalDev}) {
  const[state, dispatch]  =  useReducer(MainReducer, InitialState);
  const { instance, accounts } = useMsal();
  const [showContent, setShowContent] = useState(false);

  const getUser = async () => {
    const response = await getCurrentUser();
 
    const user = response.data;
    if (response && user ) {
      dispatch({ type: ACTIONS.SET_USER, data: user });
      setShowContent(true);
    } else {
      throw new Error('getUser - current user is invalid' + response);
    }
  }

  useEffect(() => {
    if (process.env.REACT_APP_DISABLE_AUTHENTICATION) {
        getUser();
    } else {
      if (accounts.length) {
        instance.acquireTokenSilent({
          ...authRequest,
          account: accounts[0] as AccountInfo
        }).then((response) => {
          if(response) {
            setAccessToken(response.accessToken);
            getUser();
          }
        });
      }
    }
  }, [accounts, instance]);

  const getContent = () => {
    return !showContent
      ?<ActivityOverlay></ActivityOverlay>
      :<Container fluid className={"module-container"}>
        <HashRouter hashType="noslash">
          <Sidebar></Sidebar>
          <div className="module-content-wrapper">
            <Header></Header>
            <main className="module-content">
              <Switch>
                <Route path="/home">
                  <Dashboard></Dashboard>
                </Route>
                <Route path="/admin">
                  <Admin></Admin>
                </Route>
                <Route path="/examples">
                  <Examples></Examples>
                </Route>
                <Route path="*">
                  <Redirect to="/home" />
                </Route>
              </Switch>
            </main>
          </div>
        </HashRouter>
      </Container>
  }
 
  return (
      <GlobalContext.Provider value={[state,dispatch]}>
        {!!process.env.REACT_APP_DISABLE_AUTHENTICATION
          ? getContent()
          :<MsalAuthenticationTemplate interactionType={InteractionType.Redirect} authenticationRequest={authRequest}
              loadingComponent={LoadingComponent} errorComponent={ErrorComponent}>
            {getContent()}
          </MsalAuthenticationTemplate>
        }
      </GlobalContext.Provider>
  );
}

export default App;
