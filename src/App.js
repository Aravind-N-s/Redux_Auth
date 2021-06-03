import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Switch, Route } from "react-router-dom";
import LoginContainer from "./components/views/Login/views/LoginContainer";
import RegisterContainer from "./components/views/Register/RegisterContainer";
import HomePageContainer from "./components/views/Homepage/HomePageContainer";

const App = (props) => {
  useEffect(() => {
    if (props.token) {
      props.history.push("/homepage");
    } else {
      props.history.push("/users/login");
    }
  }, [props.token]);

  const { user } = props;

  return (
    <Fragment>
      {user.loggedIn ? (
        <>
          <Switch>
            <Route
              exact
              strict
              path="/homepage"
              component={HomePageContainer}
            />
          </Switch>
        </>
      ) : (
        <>
          <Switch>
            <Route
              exact
              strict
              path="/users/login"
              component={LoginContainer}
            />
            <Route
              exact
              strict
              path="/users/register"
              component={RegisterContainer}
            />
          </Switch>
        </>
      )}
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default withRouter(connect(mapStateToProps)(App));
