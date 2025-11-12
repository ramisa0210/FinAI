// frontend/src/utils/api.js
import axios from "axios";

// ✅ Create Axios instance for API requests
const API = axios.create({
  baseURL:
    (process.env.REACT_APP_API_URL ||
      "https://finai-backend-l3ka.onrender.com") + "/api",
  withCredentials: true, // ✅ Allow sending/receiving cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// ===== USER APIs =====

// Fetch all users (for admin or testing)
export const fetchUsers = () => API.get("/users");

// Register a new user
export const registerUser = (data) =>
  API.post("/users/register", data, { withCredentials: true });

// Login existing user
export const loginUser = (data) =>
  API.post("/users/login", data, { withCredentials: true });

// Fetch logged-in user's profile (protected route)
export const getProfile = () =>
  API.get("/users/profile", { withCredentials: true });

// Logout user
export const logoutUser = () =>
  API.post("/users/logout", {}, { withCredentials: true });

export default API;
