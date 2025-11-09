import axios from "axios";

const API = axios.create({
  baseURL: "https://finai-backend-l3ka.onrender.com/api",
  withCredentials: true, 
});

export const fetchUsers = () => API.get("/users");
export const addUser = (userData) => API.post("/users", userData);
export const loginUser = (data) => API.post("/users/login", data);
export const registerUser = (data) => API.post("/users/register", data);
