import React, { createContext, useState, useCallback } from "react";

export const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 200],
    searchTerm: "",
  });
  const [layoutMode, setLayoutMode] = useState("grid"); // 'grid' or 'list'

  const applyFilters = useCallback(
    (items) => {
      let filtered = items;

      // Search filter
      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.name.toLowerCase().includes(term) ||
            (item.description && item.description.toLowerCase().includes(term)),
        );
      }

      // Category filter
      if (filters.categories.length > 0) {
        filtered = filtered.filter((item) =>
          filters.categories.includes(item.category_id),
        );
      }

      // Price range filter
      filtered = filtered.filter(
        (item) =>
          item.price >= filters.priceRange[0] &&
          item.price <= filters.priceRange[1],
      );

      return filtered;
    },
    [filters],
  );

  const updateFilters = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const updateFilteredItems = useCallback(() => {
    const filtered = applyFilters(allItems);
    setFilteredItems(filtered);
  }, [allItems, applyFilters]);

  // Update filtered items whenever allItems or filters change
  React.useEffect(() => {
    updateFilteredItems();
  }, [allItems, filters, updateFilteredItems]);

  const value = {
    categories,
    setCategories,
    allItems,
    setAllItems,
    filteredItems,
    setFilteredItems,
    filters,
    updateFilters,
    layoutMode,
    setLayoutMode,
    applyFilters,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

export const useMenu = () => {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error("useMenu must be used within MenuProvider");
  }
  return context;
};
