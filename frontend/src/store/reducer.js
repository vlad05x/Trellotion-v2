import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_FAIL,
} from "./action";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: null,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        username: action.payload.username,
        error: null,
      };
    case AUTH_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
