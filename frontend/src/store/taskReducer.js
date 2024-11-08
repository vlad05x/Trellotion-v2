
import { CREATE_TASK, GET_TASKS, SET_LOADING, SET_ERROR } from "./action";

const initialState = {
  tasks: [], 
  loading: false,
  error: null,
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case GET_TASKS:
      const existingTaskIds = new Set(state.tasks.map((task) => task._id));
      const newTasks = action.payload.filter(
        (task) => !existingTaskIds.has(task._id)
      );
      return {
        ...state,
        tasks: [...state.tasks, ...newTasks],
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
