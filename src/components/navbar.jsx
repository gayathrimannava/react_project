import React from "react";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">MyShop</a>
        <button className="btn btn-outline-light">Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
