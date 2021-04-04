import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resetUser } from "../Login/redux/action";
class HomePageContainer extends Component {
  handleUserLogout = props => {
    const { dispatch } = this.props;
    const logout = window.confirm("Do You Want To Logout");
    if (logout) {
      localStorage.removeItem("userAuthToken");
      dispatch(resetUser());
      this.props.history.push("/url");
    }
  };
  render() {
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
            <div className="col-sm-9">Users</div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default withRouter(connect(mapStateToProps)(HomePageContainer));
