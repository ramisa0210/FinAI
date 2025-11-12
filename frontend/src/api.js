// frontend/src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://finai-backend-l3ka.onrender.com/api", // ✅ Force Render backend URL
  withCredentials: true, // ✅ Allow cookies (needed for auth)
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== User Endpoints =====
export const registerUser = (data) =>
  API.post("/users/register", data, { withCredentials: true });

export const loginUser = (data) =>
  API.post("/users/login", data, { withCredentials: true });

export const getProfile = () =>
  API.get("/users/profile", { withCredentials: true });

export const logoutUser = () =>
  API.post("/users/logout", {}, { withCredentials: true });

export default API;
