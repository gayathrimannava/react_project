import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import UserList from "./UserList";
import AddUser from "./AddUser";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";

function App() {
  const [products, setProducts] = useState([]);

  // Fetch products from backend
  const fetchProducts = () => {
    fetch("http://127.0.0.1:8000/api/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/products"
              element={<ProductList products={products} />}
            />
            <Route
              path="/add-product"
              element={<AddProduct fetchProducts={fetchProducts} />}
            />
            
            <Route path="/users" element={<UserList />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
  

}

export default App;

// // App.jsx
// import React, { useState, useEffect } from "react";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);

//   // Fetch products from Django API
//   useEffect(() => {
//     if (isLoggedIn) {
//       fetch("http://127.0.0.1:8000/api/products/")
//         .then((res) => res.json())
//         .then((data) => setProducts(data))
//         .catch((err) => console.error(err));
//     }
//   }, [isLoggedIn]);

//   // Handle login (dummy login for now)
//   const handleLogin = (e) => {
//     e.preventDefault();
//     const username = e.target.username.value;
//     const password = e.target.password.value;

//     // Dummy check
//     if (username && password) {
//       setIsLoggedIn(true);
//     } else {
//       alert("Enter username and password");
//     }
//   };

//   // Add product to cart
//   const addToCart = (product) => {
//     setCart([...cart, product]);
//   };

//   if (!isLoggedIn) {
//     // Login page
//     return (
//       <div style={{ padding: "50px" }}>
//         <h1>Login</h1>
//         <form onSubmit={handleLogin}>
//           <input type="text" name="username" placeholder="Username" required />
//           <br /><br />
//           <input type="password" name="password" placeholder="Password" required />
//           <br /><br />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     );
//   }

//   // Products page
//   return (
//     <div style={{ padding: "50px" }}>
//       <h1>Products</h1>
//       <ul>
//         {products.length > 0 ? (
//           products.map((p) => (
//             <li key={p.id}>
//               {p.name} - ${p.price} 
//               <button onClick={() => addToCart(p)} style={{ marginLeft: "10px" }}>
//                 Add to Cart
//               </button>
//             </li>
//           ))
//         ) : (
//           <p>Loading products...</p>
//         )}
//       </ul>

//       <h2>Cart ({cart.length} items)</h2>
//       <ul>
//         {cart.map((item, index) => (
//           <li key={index}>
//             {item.name} - ${item.price}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

