import { CREATE_TASK, GET_TASKS } from "./action";

const initialState = {
  tasks: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TASK:
       console.log("Adding task to state:", action.payload); 
      return { ...state, tasks: [...state.tasks, action.payload] };
    case GET_TASKS:
      console.log("Fetched tasks:", action.payload);
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};
