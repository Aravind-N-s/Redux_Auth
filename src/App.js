import React, { useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import LoginContainer from "./components/views/Login/views/LoginContainer";
import RegisterContainer from "./components/views/Register/RegisterContainer";
import HomePageContainer from "./components/views/Homepage/HomePageContainer";
function App(props){
  const {token} = props 
  const history = useHistory()
  const user = useSelector(state => state.user)
  useEffect(() => {
    if (token) {
      history.push("/homepage");
    } else {
      history.push("/users/login");
    }
  }, []);
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
}

export default App;
