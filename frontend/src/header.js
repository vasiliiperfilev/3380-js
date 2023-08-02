import React, { useState } from "react";
import "./css/Header.css";
import LogoutComponent from "./logoutComponent";

const Header = () => {
  const [isNavActive, setIsNavActive] = useState(false);

  const handleMenuToggle = () => {
    setIsNavActive(!isNavActive);
  };

  return (
    <header>
      <div className="logo">Trips</div>
      <nav className={isNavActive ? "active" : ""}>
        <ul>
          <li>
            <a href="/trips">Home</a>
          </li>
          <li>
            <LogoutComponent />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
