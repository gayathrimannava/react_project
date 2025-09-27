import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ fetchProducts }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_ROOT = "http://127.0.0.1:8000/api";

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ROOT}/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        // Save token/username
        localStorage.setItem("user", JSON.stringify(data));
        if (fetchProducts) fetchProducts();
        navigate("/products");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed (network error)");
    } finally {
      setLoading(false);
    }
  };
  

  const handleGoogleLogin = () => {
    alert("Google login not yet connected to backend!");
    // Example: window.location.href = "http://127.0.0.1:8000/api/auth/google/";
  };



  
  return (
    <div className="card p-4 shadow-sm mx-auto mt-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-3 text-center">Login</h2>

      <input
        className="form-control mb-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="form-control mb-3"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        className="btn btn-primary w-100 mb-2"
        onClick={handleLogin}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        className="btn btn-danger w-100 mb-3"
        onClick={handleGoogleLogin}
      >
        <i className="bi bi-google me-2"></i> Login with Google
      </button>

      <div className="text-center">
        <small>
          Don’t have an account? <Link to="/register">Register</Link>
        </small>
      </div>
    </div>
  );
}

export default Login;
