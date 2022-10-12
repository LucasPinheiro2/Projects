import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import MainModule from "./Main/Main.js";
import AuthRegister from "./Auth/AuthRegister.js";
import AuthLogin from "./Auth/AuthLogin.js";
import MainGood from "./Main/MainGood.js";
import ErrorPage from "./Main/ErrorPage.js";
import PromptLogin from "./Main/PromptLogin.js";
import HomeError from "./Main/HomeError.js";

//realise I don't need to attempt to validate logged in at this point
//this is simply meant to define routes
const Components = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user/:username" component={MainGood} />
        <Route path="/home" component={MainModule} />
        <Route path="/register" component={AuthRegister} />
        <Route path="/login" component={AuthLogin} />
        <Route path="/errorPage" component={ErrorPage} />
        <Route path="/promptLogin" component={PromptLogin} />
        <Route path="/homeError" component={HomeError} />
        <Redirect to="/home" /> {/* show error don't just return to home page*/}
      </Switch>
    </Router>
  );
};

export default Components;
