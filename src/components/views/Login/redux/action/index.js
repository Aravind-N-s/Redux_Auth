import { authAxios } from "../../../../utils/axios";

export const startAddUser = () => {
  console.log('called')
  return dispatch => {
    authAxios
      .get("/user/account", {
        headers: {
          "Authorization": `JWT ${localStorage.getItem("userAuthToken")}`
        }
      })
      .then(response => {
        if (response.data.hasOwnProperty("errors")) {
          alert(response.data.message);
        } else {
          dispatch(addUser(response.data.responseData));
        }
      })
      .catch(err => {
        alert(err.message);
      });
  };
};

export const addUser = user => {
  return { 
    type: "SET_USER",
    payload: user
  };
};

export const setToken = () => {
  return {
    type:"SET_TOKEN"
  }
}
export const resetUser = () => {
  return { type: "RESET_USER" };
};
