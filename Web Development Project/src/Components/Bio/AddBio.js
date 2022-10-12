import React from "react";

/* STATELESS CHILD COMPONENT */
const AddBio = ({
  onClick,
  onChangeOwnerName,
  onChangeDogName,
  onChangeDogBreed,
  onChangeEmail
}) => {
  /* Add Doggy Profile section with form */
  return (
    <div>
      <hr />
      <h3>Add a Doggy Profile:</h3>
      <p>This will be displayed to other users for offline connection</p>
      <form>
        <div className="reg-form-group">
          <label>Owner Name: </label>
          <input text="ownerName" onChange={onChangeOwnerName} /> <br />
        </div>
        <div className="reg-form-group">
          {" "}
          <label>Dog Name: </label>
          <input text="dogName" onChange={onChangeDogName} /> <br />
        </div>
        <div className="reg-form-group">
          {" "}
          <label>Dog Breed: </label>
          <input text="dogBreed" onChange={onChangeDogBreed} /> <br />
        </div>
        <div className="reg-form-group">
          <label> Email: </label>
          <input type="email" text="email" onChange={onChangeEmail} />{" "}
        </div>

        <button type="submit" onClick={onClick}>
          Add Bio
        </button>
      </form>
    </div>
  );
};

export default AddBio; /* export STATELESS child component - events up*/
