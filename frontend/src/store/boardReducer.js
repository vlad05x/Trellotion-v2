import { CREATE_BOARD, GET_BOARDS, DELETE_BOARD } from "./action";

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
      const existingBoardIds = new Set(state.boards.map((board) => board._id));
      const newBoards = action.payload.filter(
        (board) => !existingBoardIds.has(board._id)
      );
      return {
        ...state,
        boards: [...state.boards, ...newBoards],
      };
    case DELETE_BOARD:
      return {
        ...state,
        boards: state.boards.filter((board) => board._id !== action.payload),
      };
    default:
      return state;
  }
};
