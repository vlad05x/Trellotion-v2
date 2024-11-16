import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001/api" });

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

// Проверяем токен при инициализации
const token = localStorage.getItem("token");
if (token) {
  setAuthToken(token);
}

export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);
export const getUser = () => API.get('/auth/user');