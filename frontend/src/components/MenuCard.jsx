import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

export const MenuCard = ({ item }) => {
  const navigate = useNavigate();
  const { id, name, description, price, image, category_name } = item;
  const numericPrice = Number(price) || 0;

  const handleClick = () => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="menu-card" onClick={handleClick}>
      <div className="menu-card-image">
        {image ? (
          <img src={image} alt={name} />
        ) : (
          <div className="menu-card-image placeholder">🍽️</div>
        )}
        <span className="menu-card-badge">{category_name || "Special"}</span>
      </div>

      <div className="menu-card-content">
        <h3 className="menu-card-name">{name}</h3>
        <p className="menu-card-description">
          {description || "Delicious item"}
        </p>

        <div className="menu-card-footer">
          <span className="menu-card-price">${numericPrice.toFixed(2)}</span>
          <div className="menu-card-rating">
            <StarRating rating={4.5} count={12} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
