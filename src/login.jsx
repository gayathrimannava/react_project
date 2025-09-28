// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";

// function Login({ fetchProducts }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const API_ROOT = "http://127.0.0.1:8000/api";

//   const handleLogin = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${API_ROOT}/login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP ${response.status}: ${errorText}`);
//       }

//       const data = await response.json();

//       if (data.success) {
//         // Save token/username
//         localStorage.setItem("user", JSON.stringify(data));
//         if (fetchProducts) fetchProducts();
//         navigate("/products");
//       } else {
//         alert(data.message || "Login failed");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       alert("Login failed (network error)");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleGoogleLogin = () => {
//     alert("Google login not yet connected to backend!");
//     // Example: window.location.href = "http://127.0.0.1:8000/api/auth/google/";
//   };



  
//   return (
//     <div className="card p-4 shadow-sm mx-auto mt-5" style={{ maxWidth: 420 }}>
//       <h2 className="mb-3 text-center">Login</h2>

//       <input
//         className="form-control mb-2"
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         required
//       />
//       <input
//         className="form-control mb-3"
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         required
//       />

//       <button
//         className="btn btn-primary w-100 mb-2"
//         onClick={handleLogin}
//         disabled={loading}
//       >
//         {loading ? "Logging in..." : "Login"}
//       </button>

//       <button
//         className="btn btn-danger w-100 mb-3"
//         onClick={handleGoogleLogin}
//       >
//         <i className="bi bi-google me-2"></i> Login with Google
//       </button>

//       <div className="text-center">
//         <small>
//           Don’t have an account? <Link to="/register">Register</Link>
//         </small>
//       </div>
//     </div>
//   );
// }

// export default Login;



import React, { useState, useContext } from "react";
import { AuthContext } from "./services/context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const success = await login(username, password);
      if (success) {
        console.log("Login successful, redirecting...");
        navigate("/products");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <form onSubmit={handleSubmit} className="p-4 border rounded">
        <h3 className="mb-3">Login</h3>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control mb-2"
          disabled={isLoading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3"
          disabled={isLoading}
          required
        />
        <button 
          type="submit" 
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
