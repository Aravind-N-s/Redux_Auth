import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { authAxios } from "../../../utils/axios";
import { isValid } from "../../../utils/service";
import {setToken} from '../../Login/redux/action'
import Form from "./Form";
function LoginContainer(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    emailError: false,
    passwordError: false
  });

  const handleChange = e => {
    e.persist();
    setState({...state, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    history.push("/users/register");
  };
  const handleSubmit = e => {
    e.preventDefault();
    const { email, password } = state;
    const emailError = isValid("email", email || '');
    const passwordError = isValid("fields", password || '');
    setState({
      ...state,
      emailError,
      passwordError
    });
    const formData = {
      email,
      password
    };
    if (emailError || passwordError) return;
    authAxios
      .post(`/user/login`, formData)
      .then(response => {
        if (response.data.errors) {
          alert(response.data.errors);
        } else {
          const token = response.data.token;
          if (token) {
            dispatch(setToken());
            localStorage.setItem("userAuthToken", token);
            alert("Welcome to the App");
            history.push("/homepage");
          }
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  console.log({state},'state')
  return (
    <Fragment>
      <div className="container" style={{ padding: "10%" }}>
        <Form
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          handleRegister={handleRegister}
          data={state}
        />
      </div>
    </Fragment>
  );
}

export default LoginContainer;
