import { actionTypes } from "../const/actionTypes.js";

export default (state = { authdata: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      // console.log("auth reducer");
      // console.log(action.data);

      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authdata: action?.data };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authdata: null };
    default:
      return state;
  }
};
