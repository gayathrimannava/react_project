import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // optional
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const API_ROOT = "http://127.0.0.1:8000/api";

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_ROOT}/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.success) {
        alert("✅ Registration successful — please log in");
        navigate("/");
      } else {
        alert(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Registration failed (network error)");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = () => {
    alert("Google register not yet connected to backend!");
    // Example: window.location.href = "http://127.0.0.1:8000/api/auth/google/";
  };

  return (
    <div className="card p-4 shadow-sm mx-auto mt-5" style={{ maxWidth: 420 }}>
      <h2 className="mb-3 text-center">Register</h2>

      <input
        className="form-control mb-2"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        className="form-control mb-2"
        type="email"
        placeholder="Email (optional)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
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
        className="btn btn-success w-100 mb-2"
        onClick={handleRegister}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <button
        className="btn btn-danger w-100 mb-3"
        onClick={handleGoogleRegister}
      >
        <i className="bi bi-google me-2"></i> Register with Google
      </button>

      <div className="text-center">
        <small>
          Already have an account? <Link to="/">Login</Link>
        </small>
      </div>
    </div>
  );
}

export default Register;
