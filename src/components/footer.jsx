import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      &copy; {new Date().getFullYear()} MyShop. All rights reserved.
    </footer>
  );
}

export default Footer;
