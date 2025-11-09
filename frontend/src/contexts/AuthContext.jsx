// frontend/src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { create } from "zustand";
import api, { setAuthToken } from "../services/api";

// Zustand store
const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem("finai_token") || null,
  setUser: (u) => set({ user: u }),
  setToken: (t) => {
    if (t) localStorage.setItem("finai_token", t);
    else localStorage.removeItem("finai_token");
    set({ token: t });
  },
  logout: () => {
    localStorage.removeItem("finai_token");
    set({ user: null, token: null });
    setAuthToken(null);
  },
}));

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { user, token, setUser, setToken, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set header if token exists on load
    if (token) {
      setAuthToken(token);
      (async () => {
        setLoading(true);
        try {
          const res = await api.get("/users/me"); // calls /api/users/me
          setUser(res.data.user);
        } catch (err) {
          console.log("Auth init failed", err);
          logout();
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token, setUser, logout]);

  const login = async (payload) => {
    const res = await api.post("/users/login", payload); // /api/users/login
    const data = res.data;
    if (data.token) {
      setToken(data.token);
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (payload) => {
    const res = await api.post("/users/register", payload); // /api/users/register
    const data = res.data;
    if (data.token) {
      setToken(data.token);
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
