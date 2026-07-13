import { useCallback, useMemo } from "react";
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const useApi = () => {
  const getCategories = useCallback(async () => {
    try {
      const response = await api.get("/customer/categories");
      return { data: response.data.categories, error: null };
    } catch (error) {
      console.error("Error fetching categories:", error);
      return { data: null, error: error.message };
    }
  }, []);

  const getAllMenuItems = useCallback(async () => {
    try {
      const response = await api.get("/customer/items");
      return { data: response.data.items, error: null };
    } catch (error) {
      console.error("Error fetching menu items:", error);
      return { data: null, error: error.message };
    }
  }, []);

  const getCategoryItems = useCallback(async (categoryId) => {
    try {
      const response = await api.get(
        `/customer/categories/${categoryId}/items`,
      );
      return { data: response.data.items, error: null };
    } catch (error) {
      console.error("Error fetching category items:", error);
      return { data: null, error: error.message };
    }
  }, []);

  const getItemDetails = useCallback(async (itemId) => {
    try {
      const response = await api.get(`/customer/items/${itemId}`);
      return { data: response.data.item, error: null };
    } catch (error) {
      console.error("Error fetching item details:", error);
      return { data: null, error: error.message };
    }
  }, []);

  const getRatings = useCallback(async (itemId) => {
    try {
      const response = await api.get(`/customer/items/${itemId}/ratings`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching ratings:", error);
      return { data: null, error: error.message };
    }
  }, []);

  const addRating = useCallback(async (itemId, rating) => {
    try {
      const response = await api.post(`/customer/items/${itemId}/rating`, {
        rating,
      });
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error adding rating:", error);
      return { data: null, error: error.message };
    }
  }, []);

  const apiMethods = useMemo(
    () => ({
      getCategories,
      getAllMenuItems,
      getCategoryItems,
      getItemDetails,
      getRatings,
      addRating,
    }),
    [
      getCategories,
      getAllMenuItems,
      getCategoryItems,
      getItemDetails,
      getRatings,
      addRating,
    ],
  );

  return apiMethods;
};
