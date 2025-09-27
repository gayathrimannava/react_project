import React, { useEffect, useState } from "react";

function ProductList({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_ROOT = "http://127.0.0.1:8000/api/products/";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_ROOT);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div>
      <h2 className="mb-4">Products</h2>
      <div className="row">
        {products.length === 0 && <p>No products available.</p>}
        {products.map((p) => (
          <div className="col-md-4" key={p.id}>
            <div className="card p-3 mb-3 shadow-sm">
              <h5 className="card-title">{p.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">${p.price}</h6>
              <p className="card-text">{p.description}</p>
              <button
                className="btn btn-success w-100"
                onClick={() => onAddToCart && onAddToCart(p)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
