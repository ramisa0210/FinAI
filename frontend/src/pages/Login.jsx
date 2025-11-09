import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login({ email: form.email, password: form.password });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout isSignUp={false}>
      <div className="p-10 bg-white rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-primary mb-2">Welcome Back</h2>
        <h3 className="text-center text-gray-600 mb-6">Login to FinAI</h3>

        {error && <div className="text-red-500 text-sm text-center mb-4">{error}</div>}

        <form onSubmit={submit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              className="w-full p-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              className="w-full p-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="text-right mb-4">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </a>
          </div>

          <button
            className="w-full py-3 bg-accent hover:bg-primary text-white font-bold rounded-md transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        
        <div className="text-center my-4 text-gray-500">
          Or Continue With
        </div>

        <button className="w-full py-3 bg-white border border-gray-300 text-gray-800 font-normal rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-300">
          <span className="text-xl">G</span>
          Sign in with Google
        </button>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-600">Don’t have an account?</span>{" "}
          <Link to="/signup" className="text-primary font-bold hover:underline">
            Sign up
          </Link>
        </div>

        <p className="text-center mt-6 text-xs text-gray-500">
          End-to-end encrypted with AES-25
        </p>
      </div>
    </AuthLayout>
  );
}
