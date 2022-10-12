import React from "react";

/* STATELESS CHILD COMPONENT */
const AddDoggyDate = ({ onChangeName, onChangeDay, onChangeTime, onClick }) => {
  return (
    /* Add Doggy Date section with form */
    <div>
      <hr />
      <h3>Add a Doggy Date:</h3>
      <form>
        <div className="reg-form-group">
          <label> Name: </label>
          <input text="name" onChange={onChangeName} /> <br />
        </div>
        <div className="reg-form-group">
          <label> Date: </label>
          <input type="date" text="day" onChange={onChangeDay} /> <br />
        </div>
        <div className="reg-form-group">
          <label> Time:</label>{" "}
          <input type="time" text="time" onChange={onChangeTime} /> <br />
        </div>
        <br />
        <button type="submit" onClick={onClick}>
          Add Doggy Date
        </button>
      </form>
    </div>
  );
};

export default AddDoggyDate; /* export STATELESS child component - events up*/
