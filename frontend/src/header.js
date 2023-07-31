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
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/trips">Trips</a>
          </li>
          <li>
            <a href="#">
              <LogoutComponent />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
