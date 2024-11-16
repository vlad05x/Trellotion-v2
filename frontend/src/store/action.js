import axios from "axios";
import { registerUser, loginUser, setAuthToken } from "../utils/api";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const SET_ERROR = "SET_ERROR";

export const CREATE_BOARD = "CREATE_BOARD";
export const GET_BOARDS = "GET_BOARDS";
export const UPDATE_BOARD = "UPDATE_BOARD";
export const DELETE_BOARD = "DELETE_BOARD";
export const FILTER_BOARD = "FILTER_BOARD";
export const UPDATE_BOARD_ORDER = "UPDATE_BOARD_ORDER";

export const CREATE_TASK = "CREATE_TASK";
export const GET_TASKS = "GET_TASKS";
export const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";
export const UPDATE_TASK = "UPDATE_TASK";
export const SET_LOADING = "SET_LOADING";
export const DELETE_TASK = "DELETE_TASK";
export const FILTER_TASK = "FILTER_TASK";
export const UPDATE_TASK_ORDER = "UPDATE_TASK_ORDER";

export const RESET_STATE = "RESET_STATE";

const BASE_URL = "http://localhost:3001";

const setToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    console.log("Token found:", token);
    setAuthToken(token);
  } else {
    console.log("No token found in localStorage.");
  }
};

const apiCall = async (method, endpoint, data = null) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  try {
    const options = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers,
    };
    if (data && method !== "delete") options.data = data;
    const response = await axios(options);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

export const resetState = () => ({
  type: RESET_STATE,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const createTask = (taskData) => async (dispatch) => {
  try {
    const data = await apiCall("post", "/api/tasks", taskData);
    dispatch({ type: CREATE_TASK, payload: data });
    return true;
  } catch (error) {
    console.error("Error creating task:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
    return false;
  }
};

export const getTasks = (boardId) => async (dispatch) => {
  try {
    const data = await apiCall("get", `/api/tasks/boards/${boardId}`);
    if (Array.isArray(data)) {
      dispatch({ type: GET_TASKS, payload: data });
    }
  } catch (error) {
    console.error("Error getting tasks:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const updateTask = (boardId, taskData) => async (dispatch) => {
  try {
    const data = await apiCall("put", `/api/tasks/${boardId}`, taskData);
    dispatch({ type: UPDATE_TASK, payload: data });
  } catch (error) {
    console.error("Error updating task:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const updateTaskStatus = (taskId, status) => async (dispatch) => {
  try {
    const data = await apiCall("put", `/api/tasks/${taskId}/status`, {
      status,
    });
    dispatch({ type: UPDATE_TASK_STATUS, payload: data });
  } catch (error) {
    console.error("Error updating task status:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await apiCall("delete", `/api/tasks/${id}`);
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    console.error("Error deleting task:", error);
    const errorMessage =
      error.response?.data?.message || "Error deleting task.";
    dispatch({ type: SET_ERROR, payload: errorMessage });
  }
};

export const filterTasks =
  ({ status, startDate, endDate }) =>
  async (dispatch) => {
    try {
      const url = `/api/tasks/filter?${status ? `status=${status}&` : ""}${
        startDate ? `startDate=${startDate}&` : ""
      }${endDate ? `endDate=${endDate}` : ""}`;

      console.log("Requesting filtered tasks with URL:", url);
      const data = await apiCall("get", url);

      console.log("Received filtered tasks:", data);
      dispatch({ type: FILTER_TASK, payload: data });
    } catch (error) {
      console.error("Error filtering tasks:", error);
      dispatch({ type: SET_ERROR, payload: error.message });
    }
  };

export const createBoard = (boardData) => async (dispatch) => {
  try {
    const data = await apiCall("post", "/api/boards", boardData);
    dispatch({ type: CREATE_BOARD, payload: data });
    return true;
  } catch (error) {
    console.error("Error creating board:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
    return false;
  }
};

export const getBoard = () => async (dispatch) => {
  try {
    const data = await apiCall("get", "/api/boards");
    if (Array.isArray(data)) {
      dispatch({ type: GET_BOARDS, payload: data });
    }
  } catch (error) {
    console.error("Error getting boards:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const updateBoard = (id, boardData) => async (dispatch) => {
  try {
    const data = await apiCall("put", `/api/boards/${id}`, boardData);
    dispatch({ type: UPDATE_BOARD, payload: data });
  } catch (error) {
    console.error("Error updating board:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const updateBoardOrder = (boards) => ({
  type: "UPDATE_BOARD_ORDER",
  payload: boards,
});

export const updateTaskOrder = (tasks) => ({
  type: "UPDATE_TASK_ORDER",
  payload: tasks,
});

export const filterBoards = (startDate, endDate) => async (dispatch) => {
  try {
    const data = await apiCall(
      "get",
      `/api/boards/filter?startDate=${startDate}&endDate=${endDate}`
    );
    dispatch({ type: FILTER_BOARD, payload: data });
  } catch (error) {
    console.error("Error filtering boards:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const deleteBoard = (id) => async (dispatch) => {
  try {
    await apiCall("delete", `/api/boards/${id}`);
    dispatch({ type: DELETE_BOARD, payload: id });
  } catch (error) {
    console.error("Error deleting board:", error);
    const errorMessage =
      error.response?.data?.message || "Error deleting board.";
    dispatch({ type: SET_ERROR, payload: errorMessage });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await loginUser(formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data.token, username: data.username },
    });
    setAuthToken(data.token);
    await dispatch(getBoard());
    await dispatch(getTasks());
    return true;
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
    return false;
  }
};
export const register = (formData) => async (dispatch) => {
  try {
    const { data } = await registerUser(formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: data.token, username: data.username },
    });
    setAuthToken(data.token);
    return true;
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
    return false;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  setAuthToken(null);
  dispatch(resetState());
  dispatch({ type: AUTH_FAIL, payload: null });
};
