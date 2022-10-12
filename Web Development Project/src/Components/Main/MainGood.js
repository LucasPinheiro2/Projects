import ScheduleDatesModule from "../DoggyDates/ScheduleDates.js";
import BioModule from "../Bio/Bio.js";
import PreferencesModule from "../DatePreferences/Preferences.js";
import ProtectedRoute from "../../Common/AppTools/ProtectedRoute.js";
import React, { useEffect, useState } from "react";
import { useParams, Redirect } from "react-router-dom";
import Parse from "parse";

const MainGood = () => {
  //grab username to display
  const { username } = useParams();

  //if a user is currently logged in (error check)
  if (Parse.User.current()) {
    //grab first and last name of current user to pass
    var firstName = Parse.User.current().get("firstName");
    var lastName = Parse.User.current().get("lastName");
  }

  //if no user is currently logged in OR
  //current username does not match the attempted path
  if (
    !Parse.User.current() ||
    username !== Parse.User.current().getUsername()
  ) {
    return (
      //redirect to error page
      <div>
        <Redirect to="/errorPage" />
      </div>
    );
  }

  return (
    <div>
      <h1>
        Welcome {firstName} {lastName}!{" "}
      </h1>

      {/*Call Class Main Modules */}
      <ScheduleDatesModule first={firstName} last={lastName} />
      <BioModule />
      <PreferencesModule />
    </div>
  );
};

export default MainGood;
