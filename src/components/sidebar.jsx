// import React from "react";
// import { Link, useLocation } from "react-router-dom";

// function Sidebar({ cart = [] }) {
//   const location = useLocation();

//   return (
//     <div
//       className="bg-light vh-100 p-3 d-flex flex-column"
//       style={{ width: "250px" }}
//     >
//       <h4 className="mb-4">Dashboard</h4>

//       {/* Navigation */}
//       <ul className="nav flex-column mb-4">
//         <li className="nav-item mb-2">
//           <Link
//             className={`nav-link ${
//               location.pathname === "/products" ? "active" : ""
//             }`}
//             to="/products"
//           >
//             Product List
//           </Link>
//         </li>
//         <li className="nav-item mb-2">
//           <Link
//             className={`nav-link ${
//               location.pathname === "/add-product" ? "active" : ""
//             }`}
//             to="/add-product"
//           >
//             Add Product
//           </Link>
//         </li>
//         <li className="nav-item mb-2">
//           <Link
//             className={`nav-link ${
//               location.pathname === "/users" ? "active" : ""
//             }`}
//             to="/users"
//           >
//             User List
//           </Link>
//         </li>
//         <li className="nav-item mb-2">
//           <Link
//             className={`nav-link ${
//               location.pathname === "/add-user" ? "active" : ""
//             }`}
//             to="/add-user"
//           >
//             Add User
//           </Link>
//         </li>
//       </ul>

//       {/* Cart */}
//       <div className="mt-auto">
//         <h5 className="mb-3">
//           Cart <span className="badge bg-secondary">{cart?.length || 0}</span>
//         </h5>
//         <div className="list-group">
//           {cart && cart.length > 0 ? (
//             cart.map((item, index) => (
//               <div
//                 key={index}
//                 className="list-group-item d-flex justify-content-between align-items-center"
//               >
//                 <div>
//                   {item.name} <br />
//                   <small className="text-muted">Qty: {item.quantity}</small>
//                 </div>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))
//           ) : (
//             <div className="list-group-item text-muted">No items in cart</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="bg-light p-3" style={{ width: "200px" }}>
      <ul className="nav flex-column">
        <li className="nav-item mb-1">
          <Link className="nav-link" to="/products">
            Products
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link className="nav-link" to="/add-product">
            Add Product
          </Link>
        </li>
        <li className="nav-item mb-1">
          <Link className="nav-link" to="/add-user">
            Add User
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;

