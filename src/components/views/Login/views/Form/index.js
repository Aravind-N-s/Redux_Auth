import React from "react";

const Form = props => {
  const { onHandleChange, onHandleSubmit, handleRegister, data } = props;
  const { email, password, emailError, passwordError } = data;
  return (
    <form>
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={onHandleChange}
        />
        {emailError ? (
          <h4 className="form-text text-danger">
            Please Check The Email Format
          </h4>
        ) : (
          <small className="form-text text-muted">
            We'll Never Share Your Email With Anyone Else.
          </small>
        )}
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onHandleChange}
        />
        {passwordError ? (
          <h4 className="form-text text-danger">
            Password Cannot Be Empty
          </h4>
        ) : (
          null
        )}
      </div>
      <button
        onClick={onHandleSubmit}
        type="submit"
        className="btn btn-primary"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
