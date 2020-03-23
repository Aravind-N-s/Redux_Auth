import React, { Component, Fragment } from "react";
import { authAxios } from "../../utils/axios";
import Form from "./Form";
import { isValid } from "../../utils/service";
import { withRouter } from "react-router-dom";
class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
      usernameError: "",
      emailError: "",
      passwordError: ""
    };
  }

  handleChange = e => {
    e.persist();
    this.setState(() => ({ [e.target.name]: e.target.value }));
  };

  handleSubmit = e => {
    e.preventDefault();
    const { username, email, password } = this.state;
    const emailError = isValid("email", email);
    const passwordError = isValid("fields", password);
    const usernameError = isValid("fields", username);
    this.setState({
      emailError,
      passwordError,
      usernameError
    });
    const formData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    if (usernameError || emailError || passwordError) return;
    authAxios
      .post(`/user/register`, formData)
      .then(response => {
        if (response.data.errors) {
          alert(response.data.errors);
        } else {
          const token = response.data.token;
          if (token) {
            localStorage.setItem("userAuthToken", token);
            this.props.history.push("/users/login");
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
        <div className="container" style={{ padding: "10%" }}>
          <Form
            onHandleSubmit={this.handleSubmit}
            onHandleChange={this.handleChange}
            data={this.state}
          />
        </div>
      </Fragment>
    );
  }
}

export default withRouter(RegisterContainer);
