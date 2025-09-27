import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProduct({ fetchProducts }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/api/products/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, description }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add product");
        return res.json();
      })
      .then(() => {
        alert("Product added successfully!");
        setName("");
        setPrice("");
        setDescription("");
        fetchProducts();
        navigate("/products");
      })
      .catch((err) => console.error("Error adding product:", err));
  };

  return (
    <div className="card p-4 shadow-sm">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success w-100">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
