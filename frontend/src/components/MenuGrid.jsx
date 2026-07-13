import React from "react";
import MenuCard from "./MenuCard";

export const MenuGrid = ({ items }) => {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuGrid;
