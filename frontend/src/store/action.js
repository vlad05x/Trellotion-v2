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

const apiCall = async (method, endpoint, data) => {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${endpoint}`,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};

export const createTask = (taskData) => async (dispatch) => {
  console.log("Creating task with data:", taskData);
  try {
    const data = await apiCall("post", "/api/tasks", taskData);
    dispatch({ type: CREATE_TASK, payload: data });
    dispatch(getTasks(taskData.boardId));
  } catch (error) {
    console.error("Error creating task:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const getTasks = (boardId) => async (dispatch) => {
  try {
    const data = await apiCall("get", `/api/tasks/board/${boardId}`);
    dispatch({ type: GET_TASKS, payload: data });
  } catch (error) {
    console.error("Error getting tasks:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const createBoard = (boardData) => async (dispatch) => {
  try {
    const data = await apiCall("post", "/api/boards", boardData);
    dispatch({ type: CREATE_BOARD, payload: data });
  } catch (error) {
    console.error("Error creating board:", error);
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const getBoard = () => async (dispatch) => {
  try {
    const data = await apiCall("get", "/api/boards");
    dispatch({ type: GET_BOARDS, payload: data });
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

export const register = (formData) => async (dispatch) => {
  try {
    const { data } = await registerUser(formData);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: data.token, username: data.username },
    });
    localStorage.setItem("token", data.token);
    setAuthToken(data.token);
    return true;
  } catch (error) {
    dispatch({ type: AUTH_FAIL, payload: error.response.data.message });
    return false;
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    const { data } = await loginUser(formData);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { token: data.token, username: data.username },
    });
    localStorage.setItem("token", data.token);
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
  dispatch({ type: AUTH_FAIL, payload: null });
};
