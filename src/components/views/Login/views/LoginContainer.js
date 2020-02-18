import React, { Component, Fragment } from "react";
import { authAxios } from "../../../utils/axios";
import { isValid } from "../../../utils/service";
import Form from "./Form";
import { connect } from "react-redux";
import { setToken } from "../../Login/redux/action";
class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      emailError: false,
      passwordError: false
    };
  }

  handleChange = e => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };

  handleRegister = () => {
    this.props.history.push("/users/register");
  };
  handleSubmit = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;
    const emailError = isValid("email", email);
    const passwordError = isValid("fields", password);
    this.setState({
      emailError,
      passwordError
    });
    const formData = {
      email: this.state.email,
      password: this.state.password
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
            this.props.history.push("/homepage");
          }
        }
      })
      .catch(err => {
        alert(err);
      });
  };
  render() {
    return (
      <Fragment>
        <div className="container" style={{padding:'10%'}}>
          <Form
            onHandleSubmit={this.handleSubmit}
            onHandleChange={this.handleChange}
            handleRegister={this.handleRegister}
            data={this.state}
          />
        </div>
      </Fragment>
    );
  }
}

export default connect()(LoginContainer);
