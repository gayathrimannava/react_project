// // import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./components/auth/LoginPage";
// import SignupPage from "./components/auth/SignupPage";
// import AdminLayout from "./components/admin/AdminLayout";
// import NotFoundPage from "./pages/NotFoundPage";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Authentication Routes */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />

//         {/* Redirect root to login page */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
        
//         {/* Admin Dashboard Routes (protected) */}
//         {/* In a real app, this would be a protected route */}
//         <Route path="/*" element={<AdminLayout />} />

//         {/* Fallback Not Found Route */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useContext } from "react";
import { AuthContext } from "./services/context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";

export function Home(){
    const {user, loggedIn, handleLogin, logout } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async() => {
        console.log(username, password);
        let response = await axios.post("http://localhost:8000/api/token/", {
            username,
            password
        });
        if(response.status === 200){
            let token = response.data.token;
            handleLogin(username, token);
            alert("Login successful");
        }else{
            alert("Login failed");
        }
    };

    const  handleLogout = () => {
        logout();
        alert("Logged out");
    }
    return <>
        <h1>Home Page</h1>
        <h1>{user}</h1>
        <h1>{loggedIn}</h1>


        <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
        <input placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>


        <button onClick={login}>Login</button>
        <button onClick={handleLogout}>Logout</button>


        { loggedIn && 
            <>
                <h2>Welcome, {user}</h2>
                <Products></Products>
            </>
        }
    </>
}

function Products() {
    const [products, setProducts] = useState([]);
    const { token, user } = useContext(AuthContext);

    const getProducts = async() => {

        console.log("Fetching products with token:", token);
        let response = await axios.get("http://localhost:8000/api/products/", {
            headers: {
                Authorization: `Token ${token}`
            }
        });
        if(response.status === 200){
            setProducts(response.data);
        }
        else{
            alert("Failed to fetch products");
            console.log(response);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    
    return <>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>{product.name}</li>
                ))}
            </ul>
            </>
}