import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  CREATE_BOARD,
  GET_BOARDS,
  DELETE_BOARD,
} from "./action";

const initialState = {
  token: localStorage.getItem("token") || null,
  username: null,
  error: null,
  boards: [],
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
    case CREATE_BOARD:
      return { ...state, boards: [...state.boards, action.payload] };
    case GET_BOARDS:
      return { ...state, boards: action.payload };
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.payload),
      };
    default:
      return state;
  }
};
