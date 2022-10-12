import Parse from "parse";
/* SERVICE FOR PARSE SERVER OPERATIONS */

// CREATE OPERATION
// create bio for dog/owner
export const createBio = (OwnerName, DogName, DogBreed, Email) => {
  const Bio = Parse.Object.extend("Bio");
  const bio = new Bio(); //create new bio object
  // using setter to UPDATE the bio object parameters
  bio.set("ownerName", OwnerName);
  bio.set("dogName", DogName);
  bio.set("dogBreed", DogBreed);
  bio.set("email", Email);
  return bio.save().then((result) => {
    return result; //save and return the bio
  });
};

// READ OPERATION BY ID
// get single bio by ID
export const getById = (id) => {
  const Bio = Parse.Object.extend("Bio");
  const query = new Parse.Query(Bio); //find Bio objects
  return query.get(id).then((result) => {
    //return only query matching id
    return result; // return single bio
  });
};

// READ OPERATION ALL
// get all bios in Parse class Bio
export const getAllBios = () => {
  const Bio = Parse.Object.extend("Bio");
  const query = new Parse.Query(Bio);
  return query.find().then((results) => {
    return results; // returns Bio objects
  });
};

export const getAllBiosBreed = (breed) => {
  const Bio = Parse.Object.extend("Bio");
  const query = new Parse.Query(Bio);
  return query
    .equalTo("dogBreed", breed)
    .find()
    .then((results) => {
      return results; // returns Bio objects
    });
};

// DELETE OPERATION
// remove datePreference by ID
export const removeBio = (id) => {
  const Bio = Parse.Object.extend("Bio");
  const query = new Parse.Query(Bio);
  return query.get(id).then((bio) => {
    //for only bio with matching id
    bio.destroy(); //remove from bio objects
  });
};
