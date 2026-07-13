import React from "react";
import { Search } from "lucide-react";
import { useMenu } from "../context/MenuContext";

export const SearchBar = () => {
  const { filters, updateFilters } = useMenu();

  const handleSearchChange = (e) => {
    updateFilters({ searchTerm: e.target.value });
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ position: "relative" }}>
        <Search
          size={20}
          style={{
            position: "absolute",
            left: "1rem",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#999",
            pointerEvents: "none",
          }}
        />
        <input
          type="text"
          placeholder="Search by name or description..."
          className="search-input"
          value={filters.searchTerm}
          onChange={handleSearchChange}
          style={{ paddingLeft: "2.5rem" }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
