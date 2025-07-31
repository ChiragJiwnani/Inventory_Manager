// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import InventoryForm from "./pages/InventoryForm";
import Login from "./pages/Login";
import Signup from "./pages/Signup.jsx";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import "./output.css";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className=" min-h-screen max-w-7xl mx-auto p-4 ">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <InventoryForm />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <InventoryForm edit />
                </PrivateRoute>
              }
            />
            <Route
              path="/passon/:id"
              element={
                <PrivateRoute>
                  <InventoryForm passOn />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}
