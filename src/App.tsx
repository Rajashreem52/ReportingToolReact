import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppBar, Button, Container, CssBaseline, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {makeStyles} from "@material-ui/core/styles";
import LoginTab from "./routes/auth/LoginTab";
import {Switch, Route, Link, Router, BrowserRouter, useHistory} from "react-router-dom";
import SignUp from "./routes/auth/SignUp";
import AuthenticationContainer from "./containers/AuthenticationContainer";
import MainAppFrame from "./containers/MainAppFrame";
import { createBrowserHistory } from 'history';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const history = createBrowserHistory();

  return (
      <React.Fragment>
        <CssBaseline />
        <Router history={history}>
          <Switch>
            <Route exact path="/signin">
              <AuthenticationContainer>
                <LoginTab/>
              </AuthenticationContainer>
            </Route>
            <Route exact path="/signup">
              <AuthenticationContainer>
                <SignUp/>
              </AuthenticationContainer>
            </Route>
            <Route path="/">
              <MainAppFrame/>
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
