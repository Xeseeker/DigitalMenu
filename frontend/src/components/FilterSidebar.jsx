import React from "react";
import { X } from "lucide-react";
import { useMenu } from "../context/MenuContext";

export const FilterSidebar = ({ isOpen, onClose }) => {
  const { categories, filters, updateFilters, allItems } = useMenu();

  // Calculate max price from all items
  const maxPrice = Math.max(...allItems.map((item) => item.price), 200);

  const handleCategoryChange = (categoryId) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter((id) => id !== categoryId)
      : [...filters.categories, categoryId];

    updateFilters({ categories: newCategories });
  };

  const handlePriceChange = (e, isMax = false) => {
    const newPrice = parseInt(e.target.value);
    const newRange = [...filters.priceRange];

    if (isMax) {
      newRange[1] = newPrice;
    } else {
      newRange[0] = newPrice;
    }

    updateFilters({ priceRange: newRange });
  };

  const handleReset = () => {
    updateFilters({
      categories: [],
      priceRange: [0, maxPrice],
      searchTerm: "",
    });
  };

  return (
    <aside className={`filter-sidebar ${isOpen ? "open" : ""}`}>
      <div className="filter-title">
        <span>Filters</span>
        <button className="filter-close" onClick={onClose}>
          <X size={24} />
        </button>
      </div>

      {/* Categories Filter */}
      <div className="filter-section">
        <h3
          style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" }}
        >
          Categories
        </h3>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="filter-item">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))
        ) : (
          <p style={{ color: "#999", fontSize: "0.875rem" }}>
            No categories available
          </p>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="filter-section">
        <h3
          style={{ fontSize: "1rem", fontWeight: "600", marginBottom: "1rem" }}
        >
          Price Range
        </h3>

        <div className="filter-item">
          <label htmlFor="min-price">
            Min Price: ${filters.priceRange[0].toFixed(2)}
          </label>
          <input
            type="range"
            id="min-price"
            min="0"
            max={maxPrice}
            value={filters.priceRange[0]}
            onChange={(e) => handlePriceChange(e, false)}
          />
        </div>

        <div className="filter-item" style={{ marginTop: "1rem" }}>
          <label htmlFor="max-price">
            Max Price: ${filters.priceRange[1].toFixed(2)}
          </label>
          <input
            type="range"
            id="max-price"
            min="0"
            max={maxPrice}
            value={filters.priceRange[1]}
            onChange={(e) => handlePriceChange(e, true)}
          />
        </div>

        <div className="price-range-display">
          <span>${filters.priceRange[0].toFixed(2)}</span>
          <span>${filters.priceRange[1].toFixed(2)}</span>
        </div>
      </div>

      {/* Reset Button */}
      <button className="filter-reset" onClick={handleReset}>
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
