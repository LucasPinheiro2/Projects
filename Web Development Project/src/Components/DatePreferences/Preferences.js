import React from "react";
import PreferenceList from "./PreferenceList";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const PreferenceModule = () => {
  return (
    <div>
      <hr />
      <h2>Owner Preferences: </h2>
      <PreferenceList /> {/* Call STATEFUL Parent*/}
      <hr />
    </div>
  );
};

export default PreferenceModule;
