import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import StarRating from "./StarRating";
import { useApi } from "../hooks/useApi";

export const ItemDetail = ({ itemId }) => {
  const navigate = useNavigate();
  const { getItemDetails } = useApi();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data, error: apiError } = await getItemDetails(itemId);

        if (apiError) {
          throw new Error(apiError);
        }

        if (!data) {
          throw new Error("Item not found");
        }

        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId, getItemDetails]);

  const handleGoBack = () => {
    navigate("/menu");
  };

  if (loading) {
    return (
      <section className="item-detail">
        <div className="container">
          <button className="btn btn-outline" onClick={handleGoBack}>
            <ArrowLeft size={20} /> Back to Menu
          </button>
          <div className="loading">Loading item details...</div>
        </div>
      </section>
    );
  }

  if (error || !item) {
    return (
      <section className="item-detail">
        <div className="container">
          <button className="btn btn-outline" onClick={handleGoBack}>
            <ArrowLeft size={20} /> Back to Menu
          </button>
          <div className="error" style={{ marginTop: "2rem" }}>
            <AlertCircle
              size={24}
              style={{ display: "inline", marginRight: "0.5rem" }}
            />
            {error || "Item not found"}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="item-detail">
      <div className="container">
        <button
          className="btn btn-outline"
          onClick={handleGoBack}
          style={{ marginBottom: "2rem" }}
        >
          <ArrowLeft size={20} /> Back to Menu
        </button>

        <div className="item-detail-grid">
          {/* Image Section */}
          <div className="item-detail-image">
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
                  fontSize: "5rem",
                  backgroundColor: "#f5f5f5",
                }}
              >
                🍽️
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="item-detail-content">
            <div className="item-detail-category">
              <span className="badge">{item.category_name || "Specialty"}</span>
            </div>

            <h2>{item.name}</h2>

            <div className="item-detail-price">
              ${Number(item.price || 0).toFixed(2)}
            </div>

            <p className="item-detail-description">
              {item.description || "No description available"}
            </p>

            {/* Rating Section */}
            <div className="item-detail-rating">
              <div>
                <StarRating rating={4.5} count={12} />
              </div>
              <span style={{ color: "#999" }}>4.5 out of 5 (12 reviews)</span>
            </div>

            {/* Availability */}
            <div
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                backgroundColor: "#f0f0f0",
                borderRadius: "0.5rem",
              }}
            >
              <p style={{ marginBottom: 0 }}>
                <strong>Availability:</strong>{" "}
                {item.is_available ? (
                  <span style={{ color: "#28a745" }}>✓ Available</span>
                ) : (
                  <span style={{ color: "#dc3545" }}>
                    ✗ Currently Unavailable
                  </span>
                )}
              </p>
            </div>

            {/* User Rating */}
            <div style={{ marginBottom: "2rem" }}>
              <h4 style={{ marginBottom: "1rem" }}>Rate this item:</h4>
              <StarRating
                rating={userRating}
                interactive={true}
                onRate={(rating) => setUserRating(rating)}
              />
            </div>

            {/* Actions */}
            <div className="item-detail-actions">
              <button className="btn btn-primary">Add to Order</button>
              <button className="btn btn-outline">Share</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
