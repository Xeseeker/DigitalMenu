import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import MenuGrid from "../components/MenuGrid";
import MenuList from "../components/MenuList";
import { useMenu } from "../context/MenuContext";
import { useApi } from "../hooks/useApi";

export const Menu = () => {
  const {
    categories,
    allItems,
    filteredItems,
    setCategories,
    setAllItems,
    layoutMode,
    setLayoutMode,
  } = useMenu();
  const { getCategories, getAllMenuItems } = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch categories
        const { data: categoriesData, error: categoriesError } =
          await getCategories();
        if (categoriesError) throw new Error(`Categories: ${categoriesError}`);
        if (categoriesData) setCategories(categoriesData);

        // Fetch all items
        const { data: itemsData, error: itemsError } = await getAllMenuItems();
        if (itemsError) throw new Error(`Items: ${itemsError}`);
        if (itemsData) setAllItems(itemsData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching menu data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleLayoutMode = (mode) => {
    setLayoutMode(mode);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <section className="section">
          <div className="container">
            <div className="loading">Loading menu...</div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="section">
        <div className="container">
          <h1 style={{ marginBottom: "2rem" }}>Our Menu</h1>

          {error && (
            <div className="error" style={{ marginBottom: "2rem" }}>
              <AlertCircle
                size={24}
                style={{ display: "inline", marginRight: "0.5rem" }}
              />
              {error}
            </div>
          )}

          {/* Search Bar */}
          <SearchBar />

          {/* Search & Filter Controls */}
          <div className="search-filter-bar">
            <div></div>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                className="filter-toggle"
                onClick={() => setIsFilterOpen(true)}
              >
                🔍 Filters
              </button>
              <div className="layout-toggle">
                <button
                  className={`${layoutMode === "grid" ? "active" : ""}`}
                  onClick={() => toggleLayoutMode("grid")}
                  title="Grid View"
                >
                  ⊞ Grid
                </button>
                <button
                  className={`${layoutMode === "list" ? "active" : ""}`}
                  onClick={() => toggleLayoutMode("list")}
                  title="List View"
                >
                  ☰ List
                </button>
              </div>
            </div>
          </div>

          <div className="menu-page-container">
            {/* Filter Sidebar */}
            <FilterSidebar
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Menu Items */}
            <div>
              {filteredItems.length > 0 ? (
                layoutMode === "grid" ? (
                  <MenuGrid items={filteredItems} />
                ) : (
                  <MenuList items={filteredItems} />
                )
              ) : (
                <div className="no-results">
                  <div className="no-results-icon">🔍</div>
                  <h3>No items found</h3>
                  <p>Try adjusting your search filters or categories</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
