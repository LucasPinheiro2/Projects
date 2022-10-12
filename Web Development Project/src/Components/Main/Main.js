import React from "react";
import { useHistory } from "react-router-dom";
//css
import "../css/main.css";

const MainModule = () => {
  const historyLogin = useHistory();
  const historySignup = useHistory();

  const loginButtonHandler = () => {
    historyLogin.push("/login"); //this will switch to our login page
  };

  const signupButtonHandler = () => {
    historySignup.push("/register"); //this will switch to our sign up page
  };

  return (
    <html>
      <body className="main">
        <h3>Does your dog need friends?</h3>
        <h1>Welcome to Doggy Dater</h1>
        <hr />
        <button onClick={loginButtonHandler}>Login</button> <br />
        <button onClick={signupButtonHandler}>Sign Up</button> <br />
        <br />
      </body>
    </html>
  );
};

export default MainModule;
