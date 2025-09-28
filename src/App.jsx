// import React, { useState, useEffect } from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "./login";
// import Register from "./register";
// import ProductList from "./ProductList";
// import AddProduct from "./AddProduct";
// import UserList from "./UserList";
// import AddUser from "./AddUser";
// import Navbar from "./components/navbar";
// import Sidebar from "./components/sidebar";
// import Footer from "./components/footer";

// function App() {
//   const [products, setProducts] = useState([]);

//   // Fetch products from backend
//   const fetchProducts = () => {
//     fetch("http://127.0.0.1:8000/api/products/")
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);
  

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       <Navbar />
//       <div className="d-flex flex-grow-1">
//         <Sidebar />
//         <div className="flex-grow-1 p-3">
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//               path="/products"
//               element={<ProductList products={products} />}
//             />
//             <Route
//               path="/add-product"
//               element={<AddProduct fetchProducts={fetchProducts} />}
//             />
            
//             <Route path="/users" element={<UserList />} />
//             <Route path="/add-user" element={<AddUser />} />
//             <Route path="*" element={<h2>Page Not Found</h2>} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
  

// }

// export default App;



import React, { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute"; // import PrivateRoute
import Login from "./login";
import Register from "./register";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import UserList from "./UserList";
import AddUser from "./AddUser";
import { AuthContext } from "./services/context/AuthContext";
import axios from "axios";

function App() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected route */}
            <Route
              path="/products"
              element={
                <PrivateRoute>
                  <ProductList products={products} />
                </PrivateRoute>
              }
            />

            <Route
              path="/add-product"
              element={
                <PrivateRoute>
                  <AddProduct fetchProducts={fetchProducts} />
                </PrivateRoute>
              }
            />

            <Route
              path="/add-user"
              element={
                <PrivateRoute>
                  <AddUser />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<h2>Page Not Found</h2>} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
