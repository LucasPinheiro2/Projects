import React from "react";

/* STATELESS CHILD COMPONENT */
const AddDatePreference = ({
  onChangeName,
  onChangePlace,
  onChangeWeather,
  onChangePeriod,
  onClick
}) => {
  return (
    /* Add Doggy Date section with form */
    <div>
      <hr />
      <h3>Choose your date preferences:</h3>
      <form>
        <div className="reg-form-group">
          <label>Owner's name: </label>
          <input text="name" onChange={onChangeName} /> <br />
        </div>
        <div className="reg-form-group">
          <label> Preferred place: </label>
          <input text="place" onChange={onChangePlace} /> <br />
        </div>
        <div className="reg-form-group">
          <label> Preferred weather: </label>
          <input text="weather" onChange={onChangeWeather} />{" "}
        </div>

        <div className="reg-form-group">
          <label>Preferred period: </label>
          <input text="period" onChange={onChangePeriod} />{" "}
        </div>

        <button type="submit" onClick={onClick}>
          Add Preferences
        </button>
      </form>
    </div>
  );
};

export default AddDatePreference; /* export STATELESS child component - events up*/
