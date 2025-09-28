// import React, { useEffect, useState } from "react";

// function ProductList({ onAddToCart }) {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const API_ROOT = "http://127.0.0.1:8000/api/products/";

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(API_ROOT);
//         if (!response.ok) throw new Error(`HTTP ${response.status}`);
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   return (
//     <div>
//       <h2 className="mb-4">Products</h2>
//       <div className="row">
//         {products.length === 0 && <p>No products available.</p>}
//         {products.map((p) => (
//           <div className="col-md-4" key={p.id}>
//             <div className="card p-3 mb-3 shadow-sm">
//               <h5 className="card-title">{p.name}</h5>
//               <h6 className="card-subtitle mb-2 text-muted">${p.price}</h6>
//               <p className="card-text">{p.description}</p>
//               <button
//                 className="btn btn-success w-100"
//                 onClick={() => onAddToCart && onAddToCart(p)}
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ProductList;



/// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/products/", config)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Fetch error:", err.response?.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mt-4">
      <h2>Products</h2>
      {/* Always goes to the AddProduct page */}
      <Link to="/add-product" className="btn btn-primary mb-3">
        Add Product
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td>{p.description}</td>
              <td>
                {/* Always go to AddProduct page for editing */}
                <Link
                  to={`/add-product?id=${p.id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
