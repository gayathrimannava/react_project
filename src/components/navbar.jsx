// import React from "react";

// function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//       <div className="container-fluid">
//         <a className="navbar-brand" href="/">MyShop</a>
//         <button className="btn btn-outline-light">Logout</button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useContext } from "react";
import { AuthContext } from "../services/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // redirect to login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          E-BUY
        </Link>

        <div className="d-flex">
          {user ? (
            <>
              <span className="me-3">Hello, {user.username}</span>
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/" className="btn btn-outline-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
