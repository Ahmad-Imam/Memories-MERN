import * as api from "../api";

import { actionTypes } from "../const/actionTypes.js";

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: actionTypes.AUTH, data });

    console.log("auth action signin calling dispatch signin");

    navigate("/");
  } catch (err) {
    console.log(err);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    console.log("auth action signin calling dispatch signin");

    const { data } = await api.signUp(formData);

    dispatch({ type: actionTypes.AUTH, data });

    navigate("/");
  } catch (err) {
    console.log(err);
  }
};
