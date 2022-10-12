import React, { useEffect, useState } from "react";
import {
  createBio,
  getById,
  getAllBios,
  getAllBiosBreed,
  removeBio
} from "/src/Common/Services/BioService";
import AddBio from "./AddBio";
import Parse from "parse";

/* STATEFUL PARENT COMPONENT */
const BioList = () => {
  // Variables in the state to hold data
  const [bios, setBios] = useState([]);
  const [ownerName, setOwnerName] = useState();
  const [dogName, setDogName] = useState();
  const [dogBreed, setDogBreed] = useState();
  const [email, setEmail] = useState();
  const [filterInput, setFilterInput] = useState("");

  // UseEffect to run when the page loads to obtain ASYNC data and render
  useEffect(() => {
    //set  list to display all bios
    getAllBios().then((bios) => {
      setBios(bios);
    });
  }, []);

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);
  const [remove, setRemove] = useState("");

  // UseEffect that runs when changes are made to the state variables/flags
  useEffect(() => {
    // Check for add flag and make sure ownerName state variable is defined
    if (ownerName && add) {
      createBio(ownerName, dogName, dogBreed, email).then((newBio) => {
        setAdd(false);
        // Add the newly created bio to the bios array to render the new list of bios
        setBios([...bios, newBio]);
      });
    }

    // Check if remove state variable is holding an ID
    if (remove.length > 0) {
      //Filter the old bios list to take out selected bio
      const newBios = bios.filter((bio) => bio.id !== remove);
      setBios(newBios);

      removeBio(remove).then(() => {
        console.log("Removed preference with ID: ", remove);
      });
      // Reset remove state variable
      setRemove("");
    }
  }, [ownerName, dogName, dogBreed, email, bios, add, remove]);

  // Handler to handle event passed from child submit button
  const onClickHandler = (e) => {
    e.preventDefault();
    setAdd(true); // Trigger add flag to create bio and re-render list with new bio
  };

  // Handlers to track changes to the child input  text
  const onChangeOwnerNameHandler = (e) => {
    e.preventDefault();
    setOwnerName(e.target.value); // Continuously updating ownerName to be added on submit
  };

  const onChangeDogNameHandler = (e) => {
    e.preventDefault();
    setDogName(e.target.value); // Continuously updating dogName to be added on submit
  };

  const onChangeDogBreedHandler = (e) => {
    e.preventDefault();
    setDogBreed(e.target.value); // Continuously updating dogBreed to be added on submit
  };

  const onChangeEmailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value); // Continuously updating email to be added on submit
  };

  return (
    // Display Bio information in list for view
    <div>
      <div id="bios">
        <input
          className="form-control"
          id="breed-input"
          onChange={(event) => setFilterInput(event.target.value)}
          value={filterInput}
          name="breed"
          placeholder="Breed"
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            if (filterInput.length > 0) {
              getAllBiosBreed(filterInput).then((result) => {
                setBios(result);
              });
            } else {
              alert("Type out a dog breed");
            }
          }}
        >
          Filter
        </button>
        {filterInput.length > 0 && (
          <button
            className="btn btn-primary"
            onClick={() => {
              setFilterInput("");
              getAllBios().then((bios) => {
                setBios(bios);
              });
            }}
          >
            Clear
          </button>
        )}

        {bios.length > 0 && (
          <ul>
            {bios.map((bio) => (
              <div className="list">
                <li key={bio.id}>
                  <b>Owner Name: </b>
                  {bio.get("ownerName")}
                </li>
                <b>Dog Name:</b> {bio.get("dogName")}
                <br />
                <b>Breed: </b>
                {bio.get("dogBreed")}
                <br />
                <b>Email: </b>
                {bio.get("email")}
                <br />
                <button
                  onClick={(e) => {
                    // Set remove variable and trigger re-render
                    const currentEmail = Parse.User.current().get("email");
                    if (bio.get("email") === currentEmail) {
                      setRemove(bio.id);
                    } else {
                      alert("You can only delete your own dogs");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </ul>
        )}
      </div>
      {/* Stateless Child component passing up events from form */}
      <AddBio
        onClick={onClickHandler}
        onChangeOwnerName={onChangeOwnerNameHandler}
        onChangeDogName={onChangeDogNameHandler}
        onChangeDogBreed={onChangeDogBreedHandler}
        onChangeEmail={onChangeEmailHandler}
      />
    </div>
  );
};

export default BioList;
