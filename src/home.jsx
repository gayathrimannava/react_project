// import { useContext, useState, useEffect } from "react";
// import { AuthContext } from "./services/context/AuthContext";
// import axios from "axios";

// export function Home() {
//   const { user, loggedIn, handleLogin, logout, token } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const login = async () => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/token/", {
//         username,
//         password,
//       });

//       if (response.status === 200) {
//         const accessToken = response.data.access;
//         handleLogin(username, accessToken);
//         setError("");
//         alert("✅ Login successful");
//       }
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError("Invalid username or password");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     setUsername("");
//     setPassword("");
//     alert("🚪 Logged out");
//   };

//   return (
//      <div className="container mt-4">
//       {/* ✅ Added Welcome message */}
//       <h1 className="text-center text-primary">Welcome to E-BUY</h1>
//       <hr />
    
//       <h1>Home Page</h1>
//       <h3>Status: {loggedIn ? "✅ Logged In" : "❌ Logged Out"}</h3>

//       {!loggedIn ? (
//         <>
//           <input
//             placeholder="Username"
//             className="form-control mb-2"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//           <input
//             placeholder="Password"
//             type="password"
//             className="form-control mb-2"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {error && <p className="text-danger">{error}</p>}
//           <button className="btn btn-primary me-2" onClick={login}>
//             Login
//           </button>
//         </>
//       ) : (
//         <>
//           <h2>Welcome, {user}</h2>
//           <button className="btn btn-danger mb-3" onClick={handleLogout}>
//             Logout
//           </button>
//           <Products token={token} />
//         </>
//       )}
//     </div>
//   );
// }

// function Products({ token }) {
//   const [products, setProducts] = useState([]);

//   const getProducts = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/products/", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.status === 200) {
//         setProducts(response.data);
//       } else {
//         console.warn("Failed to fetch products:", response);
//       }
//     } catch (err) {
//       console.error("Error fetching products:", err);
//     }
//   };

//   useEffect(() => {
//     if (token) {
//       getProducts();
//     }
//   }, [token]);

//   return (
//     <div>
//       <h2>Products</h2>
//       {products.length === 0 ? (
//         <p>No products available</p>
//       ) : (
//         <ul>
//           {products.map((product) => (
//             <li key={product.id}>{product.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


export default function Home() {
  return (
    <div>
      <h2>Welcome to E-BUY Dashboard</h2>
      <p>Manage products, users and view reports here.</p>
    </div>
  );
}

