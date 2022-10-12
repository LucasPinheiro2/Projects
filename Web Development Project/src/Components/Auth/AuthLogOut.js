import React from "react";

// This form returns the email and the password entered by the user
const AuthLogOut = ({ onLogOut }) => {
  return (
    <div>
      <button id="logoutButton" onClick={onLogOut}>
        Logout{" "}
      </button>
    </div>
  );
};

export default AuthLogOut;
