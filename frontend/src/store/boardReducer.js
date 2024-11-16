import {
  CREATE_BOARD,
  GET_BOARDS,
  UPDATE_BOARD,
  DELETE_BOARD,
  RESET_STATE,
  FILTER_BOARD,
  UPDATE_BOARD_ORDER,
} from "./action";

const initialState = {
  boards: [],
  loading: false,
  error: null,
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOARD:
      return {
        ...state,
        boards: [...state.boards, action.payload],
      };
    case GET_BOARDS:
      return {
        ...state,
        boards: action.payload,
      };
    case UPDATE_BOARD:
      return {
        ...state,
        boards: state.boards.map((board) =>
          board._id === action.payload._id ? action.payload : board
        ),
      };
    case FILTER_BOARD:
      return {
        ...state,
        boards: action.payload,
      };
    case UPDATE_BOARD_ORDER: 
    return {
      ...state,
      boards: action.payload
    }
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.payload),
      };
    case RESET_STATE:
      return initialState;
    default:
      return state;
  }
};
