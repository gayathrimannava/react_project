// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css"; // custom styles
// import { AuthContextProvider } from "/src/services/context/AuthContext";

// import { Home } from "./home";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//   <AuthContextProvider>
//     <Home></Home>
//     </AuthContextProvider>
    
//   </BrowserRouter>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./services/context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);


