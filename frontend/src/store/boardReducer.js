// редьюсер для досок (boardReducer.js)
import { CREATE_BOARD, GET_BOARDS, DELETE_BOARD } from "./action";

const initialState = {
  boards: [],
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
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
