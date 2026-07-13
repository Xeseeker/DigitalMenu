import React from "react";

export const StarRating = ({
  rating = 4.5,
  count = 0,
  interactive = false,
  onRate = null,
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  const displayRating = hoverRating || rating;

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= Math.round(displayRating) ? "" : "empty"}`}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          onClick={() => interactive && onRate && onRate(star)}
          style={{
            cursor: interactive ? "pointer" : "default",
          }}
        >
          ★
        </span>
      ))}
      {count > 0 && (
        <span
          style={{ marginLeft: "0.5rem", fontSize: "0.875rem", color: "#666" }}
        >
          ({count})
        </span>
      )}
    </div>
  );
};

export default StarRating;
