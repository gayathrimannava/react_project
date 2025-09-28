// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function AddProduct({ fetchProducts }) {
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetch("http://127.0.0.1:8000/api/products/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, price, description }),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to add product");
//         return res.json();
//       })
//       .then(() => {
//         alert("Product added successfully!");
//         setName("");
//         setPrice("");
//         setDescription("");
//         fetchProducts();
//         navigate("/products");
//       })
//       .catch((err) => console.error("Error adding product:", err));
//   };

//   return (
//     <div className="card p-4 shadow-sm">
//       <h2>Add Product</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Product Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           required
//         />
//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />
//         <button type="submit" className="btn btn-success w-100">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddProduct;


import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get("id");

  const token = localStorage.getItem("access");
  const baseConfig = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    if (!productId) return;
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/api/products/${productId}`, baseConfig)
      .then((res) => {
        setName(res.data.name);
        setPrice(res.data.price);
        setDescription(res.data.description || "");
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch product: " + (err.response?.data?.detail || err.message));
        setLoading(false);
      });
  }, [productId]);

  const handleSubmit = (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);
  if (!token) {
    setError("No authentication token found. Please log in.");
    setLoading(false);
    return;
  }
  const data = { name, price: parseFloat(price), description };
  const request = productId
    ? axios.put(`http://127.0.0.1:8000/api/product/`, {...data,id:productId}, baseConfig)
    : axios.post("http://127.0.0.1:8000/api/product/", data, baseConfig);
  request
    .then((response) => {
      console.log("Response type:", Array.isArray(response.data) ? "Array (list)" : "Object (single product)");
      console.log("Response data:", response.data);
      alert("Product added successfully!");
      setName(""); setPrice(""); setDescription("");
      navigate("/products", { state: { refresh: true } });
    })
    .catch((err) => {
      console.error("Full Error Response:", err.response);
      setError("Failed to add/update product: " + (err.response?.data?.detail || err.message));
      setLoading(false);
    });
};


  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">
          {productId ? "Update" : "Add"} Product
        </button>
      </form>
    </div>
  );
}

