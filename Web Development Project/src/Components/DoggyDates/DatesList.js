import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getAllDoggyDates,
  createDoggyDate,
  removeDoggyDate
} from "/src/Common/Services/DoggyService"; /* import functions from service */
import AddDoggyDate from "./AddDoggyDate";
import MoveDoggyDate from "./MoveDoggyDate";
import AuthLogOut from "../Auth/AuthLogOut";
import { logOut } from "../../Common/Services/AuthService.js";

/* STATEFUL PARENT COMPONENT */
const DatesList = ({ first, last }) => {
  const username = useParams();
  const historyRedirect = useHistory(); //for redirect to login after sign up

  // Variables in the state to hold data
  const [doggyDates, setDoggyDates] = useState([]);
  const [scheduledDoggyDates, setScheduledDoggyDates] = useState([]);
  const [name, setName] = useState();
  const [day, setDay] = useState();
  const [time, setTime] = useState();

  // UseEffect to run when the page loads to
  // obtain ASYNC data and RENDER real time
  useEffect(() => {
    //display top list "Upcoming Events" for open dates
    getAllDoggyDates().then((doggyDates) => {
      setDoggyDates(doggyDates);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState("");

  // UseEffect that runs when CHANGES are made to the state variables/flags
  useEffect(() => {
    // Check for add flag & name state variable is defined
    if (name && add) {
      //create new doggy Date and if return doggy date -->
      createDoggyDate(name, day, time).then((newDoggyDate) => {
        setAdd(false);
        // Add the newly created doggyDate to doggyDates array
        // to render the new list of doggyDates (thru spread/concatination)
        setDoggyDates([...doggyDates, newDoggyDate]);
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old doggyDates - not display removed
      const newDoggyDates = doggyDates.filter(
        (doggyDate) => doggyDate.id !== remove
      );
      //if doggyDate just removed - add to scheduledDoggyDates
      const newScheduledDoggyDates = doggyDates.filter(
        (doggyDate) => doggyDate.id === remove
      );

      //set doggyDates and scheduledDoggyDates based on remove state
      setDoggyDates(newDoggyDates);
      setScheduledDoggyDates(newScheduledDoggyDates);
      removeDoggyDate(remove, username, first, last); //remove that doggyDate from upper list
      setRemove(""); // Reset remove state variable
    }
  }, [name, day, time, doggyDates, scheduledDoggyDates, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    // Trigger add flag to create doggyDate and re-render list with new doggyDate
    setAdd(true);
  };

  // Handlers to track changes to the child input  text
  const onChangeNameHandler = (e) => {
    e.preventDefault();

    setName(e.target.value); // Continuously updating name to be added on submit
  };

  const onChangeTimeHandler = (e) => {
    e.preventDefault();
    setTime(e.target.value); // Continuously updating time to be added on submit
  };

  const onChangeDayHandler = (e) => {
    e.preventDefault();
    setDay(e.target.value); // Continuously updating day to be added on submit
  };

  const onLogOutHandler = (e) => {
    e.preventDefault();
    console.log("in handler");
    logOut();
    historyRedirect.push("/home"); //this will switch to our home page after log out
  };

  return (
    <div>
      <AuthLogOut onLogOut={onLogOutHandler} />
      <div id="upcomingEvents">
        {/* As long as doggyDates array exists*/}
        {doggyDates.length > 0 && (
          <ul>
            {/* for all doggyDate objects in doggyDate*/}
            {doggyDates.map((doggyDate) => (
              <div className="list">
                {/* Using getter for doggyDate Object to display name, date, and time */}
                <li key={doggyDate.id}>
                  <b>Owner Name: </b>
                  {doggyDate.get("name")}
                </li>
                <b>Date:</b> {doggyDate.get("day")}
                <br />
                <b>Time: </b>
                {doggyDate.get("time")}
                <br />
                {/* Button with inline click handler to obtain 
                  instance of doggyDate for remove state variable*/}
                <button
                  onClick={(e) => {
                    setRemove(doggyDate.id); //will triger call of move to show just scheduled
                  }}
                >
                  Request Date
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
      {/* Stateless Child component passing up events from form */}
      <AddDoggyDate
        onClick={onClickHandler}
        onChangeName={onChangeNameHandler}
        onChangeDay={onChangeDayHandler}
        onChangeTime={onChangeTimeHandler}
      />
      {/* Stateless Child component passing up events from form */}
      <MoveDoggyDate />
      <div id="scheduledEvents">
        {/* As long as scheduledDoggyDates array exists*/}
        {scheduledDoggyDates.length > 0 && (
          <ul>
            {scheduledDoggyDates.map((scheduledDoggyDate) => (
              <div className="list">
                {/* Using getter for scheduledDoggyDate Object to display name, day, time  */}
                <li key={scheduledDoggyDate.id}>
                  <b>Owner Name: </b>
                  {scheduledDoggyDate.get("name")}
                </li>
                <b>Date:</b> {scheduledDoggyDate.get("day")}
                <br />
                <b>Time: </b>
                {scheduledDoggyDate.get("time")}
                <br />
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DatesList;
