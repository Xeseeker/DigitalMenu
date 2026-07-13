import React from "react";
import { useNavigate } from "react-router-dom";
import StarRating from "./StarRating";

export const MenuList = ({ items }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/menu/${id}`);
  };

  return (
    <div className="menu-list">
      {items.map((item) => (
        <div
          key={item.id}
          className="menu-list-item"
          onClick={() => handleClick(item.id)}
        >
          <div className="menu-list-thumbnail">
            {item.image ? (
              <img src={item.image} alt={item.name} />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "2rem",
                }}
              >
                🍽️
              </div>
            )}
          </div>

          <div className="menu-list-content">
            <div className="menu-list-header">
              <h3 className="menu-list-name">{item.name}</h3>
              <p className="menu-list-description">
                {item.description || "Delicious item"}
              </p>
            </div>

            <div className="menu-list-footer">
              <span className="menu-list-price">
                ${Number(item.price || 0).toFixed(2)}
              </span>
              <div className="menu-list-rating">
                <StarRating rating={4.5} count={12} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;
