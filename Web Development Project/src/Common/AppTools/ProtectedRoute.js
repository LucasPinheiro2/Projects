import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import Parse from "parse";
import MainGood from "../../Components/Main/MainGood";

const ProtectedRoute = ({ component: Component, flag, ...rest }) => {
  const history = useHistory();
  const goBackHandler = () => {
    history.goBack();
  };

  // If the user entered a valid login and password, redirect to MainGood.js
  // Otherwise, display an error message asking the user to try to login again
  return (
    <div>
      {flag ? (
        <Redirect to={rest.path} />
      ) : (
        <div>
          {/*redirect when not */}
          <p>Invalid Username or Password, Try Again.</p>{" "}
          <button onClick={goBackHandler}>Go back.</button>
        </div>
      )}
    </div>
  );
};

export default ProtectedRoute;
