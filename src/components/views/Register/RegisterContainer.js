import React, { useState, Fragment } from "react";
import { authAxios } from "../../utils/axios";
import Form from "./Form";
import { isValid } from "../../utils/service";
import { useHistory } from "react-router-dom";
const RegisterContainer = () => {
  const history = useHistory();
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    usernameError: false,
    emailError: false,
    passwordError: false
  });

  const handleChange = e => {
    e.persist();
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = state;
    const emailError = isValid("email", email || "");
    const passwordError = isValid("fields", password || "");
    const usernameError = isValid("fields", username || "");
    setState({
      ...state,
      emailError,
      passwordError,
      usernameError
    });
    const formData = {
      username: state.username,
      email: state.email,
      password: state.password
    };
    if (usernameError || emailError || passwordError) return;
    authAxios
      .post(`/user/register`, formData)
      .then(response => {
        if (response.data.errors) {
          alert(response.data.errors);
        } else {
          alert("Please Login")
          history.push("/users/login");
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  return (
    <Fragment>
      <div className="container" style={{ padding: "10%" }}>
        <Form
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          data={state}
        />
      </div>
    </Fragment>
  );
};

export default RegisterContainer;
