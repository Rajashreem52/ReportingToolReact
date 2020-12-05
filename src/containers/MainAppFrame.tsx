import React, {useEffect, useState} from "react";
import {AppBar, Button, Grid, IconButton, Link, Toolbar, Typography} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {makeStyles} from "@material-ui/core/styles";
import AuthService from "services/auth";
import {Switch, Route, useHistory} from "react-router-dom";
import Profile from "./Profile";
import HomeIcon from "@material-ui/icons/Home";
import License from "./license";
import EditProfile from "./EditProfile";
import LicenseListAdmin from "./LicenseListAdmin";
import Ontology from "./ontology";
import OntologySearch from "./OntologySearch";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function MainAppFrame(props: any) {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(undefined);
  const history = useHistory();
  var admin=false;
  if(AuthService.getCurrentUser()!=null)
  {
    if(AuthService.getCurrentUser().id==1)
    {
     admin=true;
    }
  }
 

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    history.push("/");
    window.location.reload();
  };

  return(
      <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} >
            <Grid container direction="row" alignItems="center">
              <HomeIcon fontSize="large"/>
              <Link href="/" color="inherit" underline="none">Ontologio</Link>
            </Grid>
          </Typography>
          {currentUser &&!admin ?
          (
              <>
               <Button className={classes.button} color="inherit" variant="outlined" href="/OntologySearch">Ontology</Button>
                 <Button className={classes.button} color="inherit" variant="outlined" href="/profile">Profile</Button>
                <Button className={classes.button} color="inherit" variant="outlined" href="/license">License</Button>
                <Button color="inherit" variant="outlined" onClick={logOut}>Log out</Button>
            </>


          ) :
          admin ?
          (
              <>
               <Button className={classes.button} color="inherit" variant="outlined" href="/OntologySearch">Ontology</Button>
                 <Button className={classes.button} color="inherit" variant="outlined" href="/profile">Profile</Button>
                <Button className={classes.button} color="inherit" variant="outlined" href="/LicenseListAdmin">License</Button>
                <Button color="inherit" variant="outlined" onClick={logOut}>Log out</Button>
            </>


          ) : 
          
          (
              <>
                <Button className={classes.button} color="inherit" variant="outlined" href="/signin">Sign in</Button>
                <Button color="inherit" variant="outlined" href="/signup">Sign up</Button>
              </>
          )}
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="/license">
          <License/>
        </Route>
        <Route path="/editprofile">
          <EditProfile/>
        </Route>
        <Route path="/LicenseListAdmin">
          <LicenseListAdmin/>
        </Route>
        <Route path="/ontology">
          <Ontology/>
        </Route>
        <Route path="/OntologySearch">
          <OntologySearch/>
        </Route>
        
      </Switch>
      </>
  );
}
