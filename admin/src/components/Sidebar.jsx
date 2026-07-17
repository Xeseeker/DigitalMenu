import React from "react";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 rounded hover:bg-gray-100 ${isActive ? "bg-gray-100 font-medium" : ""}`
    }
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-white p-4 hidden md:block">
      <nav className="space-y-1">
        <NavItem to="/dashboard">Dashboard</NavItem>
        <NavItem to="/menu">Menu Items</NavItem>
        <NavItem to="/categories">Categories</NavItem>
        <NavItem to="/comments">Comments</NavItem>
      </nav>
    </aside>
  );
}
