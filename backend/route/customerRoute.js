import express from "express";
import {
  getCategories,
  getAllMenuItems,
  getCategoryItems,
  getComments,
  getItemDetails,
  getRatings,
  addComment,
  addRating,
} from "../controller/customerController.js";
const customerRouter = express.Router();

// Categories
customerRouter.get("/categories", getCategories);

// Menu Items
customerRouter.get("/items", getAllMenuItems);
customerRouter.get("/categories/:categoryId/items", getCategoryItems);

// Single Item Details
customerRouter.get("/items/:itemId", getItemDetails);

// Ratings
customerRouter.post("/items/:itemId/rating", addRating);

// Comments
customerRouter.post("/items/:itemId/comment", addComment);

// View Comments
customerRouter.get("/items/:itemId/comments", getComments);

// View Ratings
customerRouter.get("/items/:itemId/ratings", getRatings);

export default customerRouter;
