import React, { Fragment, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { resetUser } from "../Login/redux/action";
const HomePageContainer = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch;
  const history = useHistory;
  const handleUserLogout = () => {
    const logout = window.confirm("Do You Want To Logout");
    if (logout) {
      localStorage.removeItem("userAuthToken");
      dispatch(resetUser());
      history.push("/users/login");
    }
  };
  return (
    <Fragment>
      <div
        className="container"
        style={{ display: "grid", padding: "50px", gridGap: "10px" }}
      >
        <div className="row">
          <div className="col-sm-3" style={{ border: "1" }}>
            Hello
          </div>
          <div className="col-sm-9">{user.username}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePageContainer;
