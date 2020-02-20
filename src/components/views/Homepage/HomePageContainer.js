import React, { Fragment, useEffect } from "react";
import { Header } from "../../utils/header";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { startAddUser,resetUser } from "../Login/redux/action";
const HomePageContainer = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleUserLogout = () => {
    const logout = window.confirm("Do You Want To Logout");
    if (logout) {
      dispatch(resetUser());
      history.push("/users/login");
      localStorage.removeItem("userAuthToken");
    }
  };
  return (
    <Fragment>
      <Header
          logout={handleUserLogout}
          name={"HomePage"}
        />
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
