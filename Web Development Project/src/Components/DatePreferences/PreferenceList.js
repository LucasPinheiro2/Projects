import React, { useEffect, useState } from "react";
import {
  createPreferences,
  getAllDatePreferences,
  removeDatePreference
} from "./../../Common/Services/PreferencesService";
import AddDatePreference from "./PreferencesForm";

/* STATEFUL PARENT COMPONENT */
const PreferenceList = () => {
  // Variables in the state to hold data
  const [preferences, setPreferences] = useState([]);
  const [name, setName] = useState();
  const [place, setPlace] = useState();
  const [period, setPeriod] = useState();
  const [weather, setWeather] = useState();

  // UseEffect to run when the page loads to obtain ASYNC data and render
  useEffect(() => {
    //set  list to display all preferences
    getAllDatePreferences().then((preferences) => {
      setPreferences(preferences);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState("");

  // UseEffect that runs when changes are made to the state variables/flags
  useEffect(() => {
    // Check for add flag and make sure name state variable is defined
    if (name && add) {
      createPreferences(name, place, period, weather).then((newPreference) => {
        setAdd(false);
        // Add the newly created preference to the preferences array to render the new list of preferences
        setPreferences([...preferences, newPreference]);
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old preferences list to take out selected preference
      const newPreferences = preferences.filter(
        (preference) => preference.id !== remove
      );
      setPreferences(newPreferences);

      removeDatePreference(remove).then(() => {
        console.log("Removed preference with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [name, place, period, weather, preferences, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    setAdd(true); // Trigger add flag to create bio and re-render list with new preference
  };

  // Handlers to track changes to the child input  text
  const onChangeNameHandler = (e) => {
    e.preventDefault();
    setName(e.target.value); // Continuously updating ownerName to be added on submit
  };

  const onChangePlaceHandler = (e) => {
    e.preventDefault();
    setPlace(e.target.value); // Continuously updating place to be added on submit
  };

  const onChangeWeatherHandler = (e) => {
    e.preventDefault();
    setWeather(e.target.value); // Continuously updating weather to be added on submit
  };

  const onChangePeriodHandler = (e) => {
    e.preventDefault();
    setPeriod(e.target.value); // Continuously updating period to be added on submit
  };

  return (
    // Display preferences information in list for view
    <div>
      <div id="preferences">
        {preferences.length > 0 && (
          <ul>
            {preferences.map((preference) => (
              <div className="list">
                <li key={preference.id}>
                  <b>Owner Name: </b>
                  {preference.get("name")}
                </li>
                <b>Preferred place: </b> {preference.get("place")}
                <br />
                <b>Preferred weather: </b>
                {preference.get("weather")}
                <br />
                <b>Preferred period: </b>
                {preference.get("period")}
                <br />
                <button
                  onClick={(e) => {
                    // Set remove variable and trigger re-render
                    setRemove(preference.id);
                  }}
                >
                  Delete Preference
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
      {/* Stateless Child component passing up events from form */}
      <AddDatePreference
        onClick={onClickHandler}
        onChangeName={onChangeNameHandler}
        onChangePlace={onChangePlaceHandler}
        onChangeWeather={onChangeWeatherHandler}
        onChangePeriod={onChangePeriodHandler}
      />
    </div>
  );
};

export default PreferenceList;
