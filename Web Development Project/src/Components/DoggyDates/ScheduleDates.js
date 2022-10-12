import React from "react";
import DatesList from "./DatesList";
import DatesGraph from "./DatesGraph";

/* MAIN MODULE WITH STATEFUL PARENT AND STATELESS CHILD */
const ScheduleDatesModule = ({ first, last }) => {
  return (
    <div>
      <h2>Upcoming Events:</h2>
      <DatesList first={first} last={last} /> {/* Call STATEFUL Parent*/}
      <DatesGraph />
    </div>
  );
};

export default ScheduleDatesModule;
