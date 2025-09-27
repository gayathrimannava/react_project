import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

function Main() {
  const username = "testuser"; // replace with actual logged-in user
  const [cart, setCart] = useState([]);

  // Fetch cart items from backend
  const fetchCartItems = () => {
    fetch(`http://127.0.0.1:8000/api/cart/${username}/`)
      .then(res => res.json())
      .then(data => setCart(data))
      .catch(err => console.error(err));
  };

  // Add product to cart
  const addToCart = (product) => {
    fetch("http://127.0.0.1:8000/api/cart/add/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, product_id: product.id, quantity: 1 }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);
        fetchCartItems(); // update cart
      });
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar cart={cart} />
        <div className="flex-grow-1 p-4 overflow-auto">
          <Outlet context={{ addToCart, cart }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
