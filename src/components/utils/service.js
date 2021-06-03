export const isValid = (field, value) => {
  console.log(":::::2", { field, value });
  // eslint-disable-next-line no-useless-escape
  const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  switch (field) {
    case "password": {
      return value.trim() === "";
    }
    case "email": {
      if (emailReg.test(value) === true) {
        return value.trim() === "";
      } else {
        return true;
      }
    }
    default: {
      return true;
    }
  }
};
