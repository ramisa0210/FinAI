import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLayout from "../components/AuthLayout";

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "SME Owner" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      await register(form);
      navigate("/dashboard");
    } catch (error) {
      setErr(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout isSignUp={true}>
      <div className="w-full max-w-md pb-5">
        <div className="flex items-center justify-center mb-2 gap-2">
          <div className="bg-primary text-white rounded-md px-2 py-1 text-xl font-bold">
            FI
          </div>
          <span className="text-2xl font-bold text-primary">FinAI</span>
        </div>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-1">Get Started</h2>
        <p className="text-gray-600 text-center mb-6">
            Create your account to start managing finances
        </p>
        
        {err && <div className="text-red-500 text-sm mb-4">{err}</div>}
        
        <form onSubmit={submit} className="flex flex-col gap-4">
                    <div>
                      <label className="text-sm text-gray-600">Full Name</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">👤</span>
                        <input
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          type="text"
                          className="w-full p-2 pl-10 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-600">Email Address</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">📧</span>
                        <input
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          type="email"
                          className="w-full p-2 pl-10 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                    </div>
          
          <div>
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-primary">🔒</span>
                <input
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    type="password"
                    className="w-full p-2 pl-10 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                    required
                />
            </div>
          </div>
          
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full p-3 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md"
                required
            >
                <option value="SME Owner">Select your role</option> 
<option value="Finance Manager">Finance Manager</option>
<option value="SMB Owner">SMB Owner</option>
<option value="Accountant">Accountant</option>
<option value="CEO">CEO / Director</option>
<option value="Operations Manager">Operations Manager</option>
<option value="Marketing Specialist">Marketing Specialist</option>
<option value="IT Manager">IT Manager</option>
<option value="Other">Other</option>
            </select>
          </div>
          
          <button
            className="w-full py-3 mt-2 bg-accent hover:bg-primary text-white font-bold rounded-md transition duration-300 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-500 text-sm">
          Or Continue With
        </div>

        <button className="w-full py-3 bg-white border border-gray-300 text-gray-800 font-normal rounded-md flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-300">
          <span className="text-xl">G</span>
          Sign in with Google
        </button>
        
        <div className="text-center mt-6 text-sm">
          <span className="text-gray-800">Already have an account?</span>{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Log In
          </Link>
        </div>
        
        <p className="text-center mt-2 text-xs text-gray-500">
          End-to-end encrypted with AES-25
        </p>
      </div>
    </AuthLayout>
  );
}