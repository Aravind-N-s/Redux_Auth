import React, { useState, Fragment } from "react";
import { authAxios } from "../../../utils/axios";
import { isValid } from "../../../utils/service";
import { connect } from "react-redux";
import { setToken } from "../../Login/redux/action";

const LoginContainer = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
  });

  const handleChange = (e) => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    const error = isValid(e.target.name, e.target.value) || false;
    setState({
      ...state,
      emailError: e.target && e.target.name === "email" && error,
      passwordError: e.target && e.target.name === "password" && error,
    });
  };

  const handleSubmit = () => {
    const { dispatch } = props;
    const { email, password, emailError, passwordError } = state;
    if (emailError || passwordError) return;
    try {
      const response = authAxios.post(`/user/login`, { email, password });
      const token = response.data.token;
      if (token) {
        dispatch(setToken());
        alert("Welcome to the App");
        localStorage.setItem("userAuthToken", token);
        this.props.history.push("/homepage");
      }
    } catch (err) {
      alert(err.data.errors);
    }
  };

  const { email, password, emailError, passwordError } = state;
  return (
    <Fragment>
      <div className="container" style={{ padding: "10%" }}>
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {emailError ? (
              <small className="form-text text-danger">
                Please check email format
              </small>
            ) : (
              <p className="form-text text-muted">
                We'll never share your email with anyone else.
              </p>
            )}
            <br />
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            {passwordError && (
              <small className="form-text text-danger">
                Password cannot be empty
              </small>
            )}
          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            // disabled={!emailError || !passwordError}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default connect()(LoginContainer);
