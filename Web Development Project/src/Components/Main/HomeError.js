import React from "react";
import { useHistory } from "react-router-dom";

export default function HomeError() {
  const historyRedirect = useHistory();

  const returnHandler = () => {
    historyRedirect.push("/home"); //this will switch to our login page
  };
  return (
    <div>
      <h1>Fault: This page does not exist</h1>
      <h4>Redirect to home page</h4>
      <button onClick={returnHandler}>Home</button> <br />
    </div>
  );
}
