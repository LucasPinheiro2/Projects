import React from "react";
import { useHistory, useParams } from "react-router-dom";

export default function PromptLogin() {
  const historyRedirect = useHistory();

  const returnHandler = () => {
    historyRedirect.push("/login"); //this will switch to our login page
  };
  return (
    <div>
      <h1>Welcome, you successfully registered!</h1>
      <h4>Now Log In: </h4>
      <button onClick={returnHandler}>Login</button> <br />
    </div>
  );
}
