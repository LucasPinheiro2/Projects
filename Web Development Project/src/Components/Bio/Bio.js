import React from "react";
import BioList from "./BioList";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const BioModule = () => {
  return (
    <div>
      <hr />
      <h2>Connect with these friends offline! </h2>
      <BioList /> {/* Call STATEFUL Parent*/}
      <hr />
    </div>
  );
};

export default BioModule;
