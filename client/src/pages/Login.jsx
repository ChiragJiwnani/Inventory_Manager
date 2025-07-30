// client/src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import api from "../services/api"; // default Axios instance

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token } = response.data;

      login(token); 
      navigate("/"); 
    } catch (err) {
      alert("Login failed. Please check your credentials.");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto bg-sky-100 shadow-xl rounded-xl">
      <h2 className="text-xl mb-4 font-semibold text-center text-sky-800">Login</h2>
      
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 bg-sky-50 rounded mb-2"
        required
        />
      
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 bg-sky-50 rounded mb-4"
        required
        />
      
      <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded hover:bg-blue-700">
        Login
      </button>
      
      {/* <p className="mt-4 text-center">
        Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </p> */}
    </form>
        </div>
  );
}
