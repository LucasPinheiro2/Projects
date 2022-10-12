import React, { useEffect, useState } from "react";
import { checkUser } from "../../Common/Services/AuthService.js";
import AuthLoginForm from "./AuthLoginForm";
import { Link } from "react-router-dom"; //to return to home page
import ProtectedRoute from "../../Common/AppTools/ProtectedRoute";
import MainGood from "../Main/MainGood";
import Parse from "parse";

const AuthLogin = () => {
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});
  // The flag indicates whether the user has inserted a valid login and password
  const [flag, setFlag] = useState(false);
  // The stateFlag prevents the user from being redirected before pressing the submit button
  const [stateflag, setStateflag] = useState(false);

  useEffect(() => {
    if (username && password) {
      checkUser(username, password).then(function (result) {
        setFlag(result); //use this flag for protected route
      }); //return value of flag
    }
  }, [username, password]);

  // onChange handlers for the username and the password
  const onChangePasswordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const onChangeUsernameHandler = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  // onSubmit handler for the submit button
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setStateflag(true);
    if (flag) {
      Parse.User.logIn(username, password);
    }
  };

  let str1 = "/user";
  let str2 = str1.concat("/");
  let fullPath = str2.concat(username);

  return (
    <div>
      <AuthLoginForm
        onChangeUsername={onChangeUsernameHandler}
        onChangePassword={onChangePasswordHandler}
        onSubmit={onSubmitHandler}
      />
      <br />
      <hr />
      <Link to="/home">
        {" "}
        {/*Button to return to home page */}
        <button>Home</button>
        {/*Link the user to the protected route if the submit button is pressed*/}
      </Link>
      {stateflag && (
        //call protected route at log in
        //change this to a call to Auth which calls Protected Route?
        <ProtectedRoute
          exact
          path={fullPath}
          flag={flag}
          component={MainGood}
        />
      )}
    </div>
  );
};

export default AuthLogin;
