import {
  CREATE_TASK,
  GET_TASKS,
  SET_LOADING,
  SET_ERROR,
  RESET_STATE,
  DELETE_TASK,
  UPDATE_TASK,
  FILTER_TASK,
  UPDATE_TASK_STATUS,
  UPDATE_TASK_ORDER,
} from "./action";

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
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case FILTER_TASK:
      return {
        ...state,
        tasks: action.payload,
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case UPDATE_TASK_STATUS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id
            ? { ...task, status: action.payload.status }
            : task
        ),
      };
    case UPDATE_TASK_ORDER:
      return {
        ...state,
        tasks: action.payload,
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
    case RESET_STATE:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
