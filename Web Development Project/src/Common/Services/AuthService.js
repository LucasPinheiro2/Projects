import Parse from "parse";

// Create a new user
export const createUser = (newUser) => {
  const user = new Parse.User();

  user.set("username", newUser.email);
  user.set("firstName", newUser.firstName);
  user.set("lastName", newUser.lastName);
  user.set("password", newUser.password);
  user.set("email", newUser.email);

  return (
    user
      .signUp()
      .then((newUserSaved) => {
        return newUserSaved;
      })
      // The catch method displays an alert if something goes wrong with the user registration
      .catch((error) => {
        alert(`Error: ${error.message}`);
      })
  );
};

//check user when attempting log in
export const checkUser = (username, password) => {
  const usernameValue = username;
  const passwordValue = password;
  var flag = false;

  // The flag indicates whether the login and password entered by the user are valid
  return (
    Parse.User.logIn(usernameValue, passwordValue)
      .then((results) => {
        flag = true;
        return flag;
      })
      // The catch method sets the flag to false if the login and password are invalid
      .catch((error) => {
        flag = false;
        return flag;
        // error is an instance of parse.error.
      })
  );
};

//user log out of account - can access account without another log in
export const logOut = () => {
  // The flag indicates whether the login and password entered by the user are valid
  return (
    Parse.User.logOut()
      .then((results) => {})
      // The catch method sets the flag to false if the login and password are invalid
      .catch((error) => {
        console.log("error occurred");
      })
  );
};
