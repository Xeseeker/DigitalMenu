import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar bg-white/90 backdrop-blur-xl border-b border-emerald-100 shadow-sm">
      <div className="navbar-container">
        <Link
          to="/"
          className="navbar-brand flex items-center gap-3"
          onClick={closeMenu}
        >
          <img
            src="/assets/logo/weyra_logo_1.png"
            alt="Brand logo"
            className="h-10 w-10 rounded-full object-contain border border-emerald-200 bg-white"
          />
          <span className="text-2xl font-bold text-emerald-900">
            ወይራ Digital Menu
          </span>
        </Link>

        <button
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <li className="navbar-menu-item">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li className="navbar-menu-item">
            <Link to="/menu" onClick={closeMenu}>
              Menu
            </Link>
          </li>
          <li className="navbar-menu-item">
            <a href="#about" onClick={closeMenu}>
              About
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
