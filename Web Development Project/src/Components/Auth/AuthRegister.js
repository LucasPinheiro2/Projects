import React, { useEffect, useState } from "react";
import { createUser } from "../../Common/Services/AuthService.js";
import AuthRegisterForm from "./AuthRegisterForm";
import { Link, useHistory } from "react-router-dom"; //to return to home page

const AuthRegister = () => {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const historyRedirect = useHistory(); //for redirect to login after sign up

  // Flags in the state to watch for add/remove updates
  const [add, setAdd] = useState(false);

  // useEffect that runs when changes are made to the state variable flags
  useEffect(() => {
    if (newUser && add) {
      createUser(newUser).then((userCreated) => {
        setAdd(false);
        historyRedirect.push("/promptLogin"); //this will switch to our login page
      });
    }
  }, [newUser, add]);

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value: newValue } = e.target;
    setNewUser({
      ...newUser,
      [name]: newValue
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submitted: ", e.target);
    setAdd(true);
  };

  return (
    <div>
      <AuthRegisterForm
        user={newUser}
        onChange={onChangeHandler}
        onSubmit={onSubmitHandler}
      />
      <br />
      <hr />
      <Link to="/home">
        {" "}
        {/*return to home page */}
        <button>Home</button>
      </Link>
    </div>
  );
};

export default AuthRegister;
