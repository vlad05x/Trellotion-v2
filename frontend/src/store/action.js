import axios from "axios";
import { registerUser, loginUser, setAuthToken } from "../utils/api";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const AUTH_FAIL = "AUTH_FAIL";
export const SET_ERROR = "SET_ERROR";

export const CREATE_BOARD = "CREATE_BOARD";
export const GET_BOARDS = "GET_BOARDS";
export const DELETE_BOARD = "DELETE_BOARD";

export const CREATE_TASK = "CREATE_TASK";
export const GET_TASKS = "GET_TASKS";
export const SET_LOADING = "SET_LOADING";

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
  setAuthToken(null);
  dispatch({ type: AUTH_FAIL, payload: null });
};
