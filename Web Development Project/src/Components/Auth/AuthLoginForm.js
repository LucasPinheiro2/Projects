import React from "react";

// This form returns the email and the password entered by the user
const AuthLoginForm = ({ onChangeUsername, onChangePassword, onSubmit }) => {
  return (
    <div>
      <h3>Welcome back, login below!</h3>
      <form onSubmit={onSubmit} autoComplete="off">
        <div className="reg-form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            id="email-input"
            onChange={onChangeUsername}
            name="email"
            required
          />
        </div>
        <div className="reg-form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="password-input"
            onChange={onChangePassword}
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
    </div>
  );
};

export default AuthLoginForm;
