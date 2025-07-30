// Signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // ✅ fix

export default function Signup() {
  const [username, setUsername] = useState(""); // ✅ fix
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { username, email, password });
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (err) {
      alert("Signup failed.");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl mb-4 font-semibold text-center">Sign Up</h2>

      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full px-4 py-2 border rounded mb-2"
        required
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded mb-2"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full px-4 py-2 border rounded mb-4"
        required
      />

      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Sign Up
      </button>

      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
      </p>
    </form>
  );
}
