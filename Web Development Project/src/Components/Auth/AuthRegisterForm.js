import React from "react";

// This form gets the data to register a new user on the database
const AuthRegisterForm = ({ user, onChange, onSubmit }) => {
  return (
    <html>
      <h3>Sign up to join our doggy service!</h3>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="reg-form-group">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            id="first-name-input"
            value={user.firstName}
            onChange={onChange}
            name="firstName"
            required
          />
        </div>
        <div className="reg-form-group">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            id="last-name-input"
            value={user.lastName}
            onChange={onChange}
            name="lastName"
            required
          />
        </div>{" "}
        <div className="reg-form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            value={user.email}
            onChange={onChange}
            name="email"
            required
          />
        </div>{" "}
        <div className="reg-form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password-input"
            value={user.password}
            onChange={onChange}
            name="password"
            min="0"
            required
          />
        </div>
        <div className="reg-form-group">
          <button type="submit" className="btn btn-primary" onSubmit={onSubmit}>
            Submit
          </button>
        </div>
      </form>
    </html>
  );
};

export default AuthRegisterForm;
