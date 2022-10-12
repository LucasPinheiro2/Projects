import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE OPERATION
// DatePreference class
export const createPreferences = (Name, Place, Weather, Period) => {
  const DatePreference = Parse.Object.extend("DatePreference");
  const datePreference = new DatePreference(); //create new datePreference object
  //use setter to UPDATE parameters of datePreference object
  datePreference.set("name", Name);
  datePreference.set("place", Place);
  datePreference.set("weather", Weather);
  datePreference.set("period", Period);
  return datePreference.save().then((result) => {
    return result; // returns new datePreference object
  });
};

// READ OPERATION BY ID
// get single datePreference by ID
export const getById = (id) => {
  const DatePreference = Parse.Object.extend("DatePreference");
  const query = new Parse.Query(DatePreference);
  return query.get(id).then((result) => {
    // return DatePreference object with matching id only
    return result;
  });
};

// READ OPERATION ALL
// get all datePreferences in Parse class DatePreference
export const getAllDatePreferences = () => {
  const DatePreference = Parse.Object.extend("DatePreference");
  const query = new Parse.Query(DatePreference);
  return query.find().then((results) => {
    return results; // returns array of datePreference objects
  });
};

// DELETE OPERATION
// remove datePreference by ID
export const removeDatePreference = (id) => {
  const DatePreference = Parse.Object.extend("DatePreference");
  const query = new Parse.Query(DatePreference);
  return query.get(id).then((datePreference) => {
    //for only datePreference with matching id
    datePreference.destroy(); //remove from datePreference objects
  });
};
