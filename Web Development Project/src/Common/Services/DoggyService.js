import Parse from "parse";
//send email
import ContactUs from "../../Components/DoggyDates/Email";

/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE OPERATION
// new doggyDate with parameters
export const createDoggyDate = (Name, Day, Time) => {
  const DoggyDate = Parse.Object.extend("DoggyDate");
  const doggyDate = new DoggyDate(); //create new doggyDate object
  //use setter to UPDATE parameters of doggyDate object
  doggyDate.set("name", Name);
  doggyDate.set("day", Day);
  doggyDate.set("time", Time);
  return doggyDate.save().then((result) => {
    return result; // returns new doggyDate object
  });
};

// READ OPERATION BY ID
// get single doggyDate by ID
export const getById = (id) => {
  const DoggyDate = Parse.Object.extend("DoggyDate");
  const query = new Parse.Query(DoggyDate);
  return query.get(id).then((result) => {
    // return DoggyDate object with matching id only

    return result;
  });
};

// READ OPERATION ALL
// get all doggyDates in Parse class Lesson
export const getAllDoggyDates = () => {
  const DoggyDate = Parse.Object.extend("DoggyDate");
  const query = new Parse.Query(DoggyDate);
  return query.find().then((results) => {
    return results; // returns array of DoggyDate objects
  });
};

// DELETE OPERATION
// remove doggyDate by ID
export const removeDoggyDate = (id, username, first, last) => {
  const DoggyDate = Parse.Object.extend("DoggyDate");
  const query = new Parse.Query(DoggyDate);
  return query.get(id).then((doggyDate) => {
    //for only DoggyDate with matching id
    moveDoggyDate(doggyDate); //send to move function - to move to other subject
    emailDoggyDate(doggyDate, username, first, last); //SEND EMAIL
    doggyDate.destroy(); //remove from DoggyDate objects
  });
};

export const moveDoggyDate = (doggyDate) => {
  const ScheduledDoggyDate = Parse.Object.extend("ScheduledDoggyDate");
  const scheduledDoggyDate = new ScheduledDoggyDate(); //create scheduledDoggyDate object
  // using setter to UPDATE the object parameters
  scheduledDoggyDate.set("name", doggyDate.get("name"));
  scheduledDoggyDate.set("day", doggyDate.get("day"));
  scheduledDoggyDate.set("time", doggyDate.get("time"));

  return scheduledDoggyDate.save().then((result) => {
    return result; //returns new DoggyDate object
  });
};

//function to send email
export const emailDoggyDate = (doggyDate, username, first, last) => {
  console.log("emailDoggyDate");
  //console.log("first", first);
  //console.log("last", first);
  ContactUs(
    username,
    first,
    last,
    doggyDate.get("name"),
    doggyDate.get("day"),
    doggyDate.get("time")
  );
};
