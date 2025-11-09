import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchUsers = () => API.get("/users");
export const addUser = (userData) => API.post("/users", userData);
